import os
from django.shortcuts import get_object_or_404, redirect
from rest_framework import viewsets, permissions
from .models import Link
from .serializers import LinkSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .models import PasswordResetOTP
from .serializers import RequestOTPSerializer, VerifyOTPSerializer, ResetPasswordSerializer
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User = get_user_model()

def root_link(request, link_slug):
    link = get_object_or_404(Link, slug=link_slug)
    link.click()
    return redirect(link.url)

class LinkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows links to be viewed or edited.
    """
    queryset = Link.objects.all()  # Base queryset
    serializer_class = LinkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only links created by the logged-in user
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Set the user field to the current user
        serializer.save(user=self.request.user)


class CustomGoogleOAuth2Client(OAuth2Client):
    def __init__(
        self,
        request,
        consumer_key,
        consumer_secret,
        access_token_method,
        access_token_url,
        callback_url,
        _scope,  # Fix for allauth/dj-rest-auth incompatibility
        scope_delimiter=" ",
        headers=None,
        basic_auth=False,
    ):
        super().__init__(
            request,
            consumer_key,
            consumer_secret,
            access_token_method,
            access_token_url,
            callback_url,
            scope_delimiter,
            headers,
            basic_auth,
        )


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = CustomGoogleOAuth2Client
    callback_url = "http://localhost:5173/auth/google/callback"


@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset_otp(request):
    serializer = RequestOTPSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        
        # Check if user exists
        if not User.objects.filter(email=email).exists():
            return Response(
                {"detail": "If a user with this email exists, we have sent an OTP."},
                status=status.HTTP_200_OK
            )
        
        # Generate OTP
        otp_obj = PasswordResetOTP.generate_otp(email)
        
        # Send email with OTP
        subject = 'Password Reset OTP'
        message = f'Your OTP for password reset is: {otp_obj.otp}\nThis OTP is valid for 1 minute.'
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        
        return Response(
            {"detail": "If a user with this email exists, we have sent an OTP."},
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            return Response({
                'message': 'OTP verified successfully',
                'email': serializer.validated_data['email']
            })
        return Response(serializer.errors, status=400)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(email=email)
                user.set_password(new_password)
                user.save()
                
                # Mark OTP as used
                otp = PasswordResetOTP.objects.get(email=email, is_used=False)
                otp.is_used = True
                otp.save()
                
                return Response({
                    'message': 'Password reset successful'
                })
            except User.DoesNotExist:
                return Response({
                    'message': 'User not found'
                }, status=404)
            except PasswordResetOTP.DoesNotExist:
                return Response({
                    'message': 'Invalid or expired OTP'
                }, status=400)
                
        return Response(serializer.errors, status=400)

