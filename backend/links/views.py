import os
from django.shortcuts import get_object_or_404, redirect
from rest_framework import viewsets, permissions
from .models import Link
from .serializers import LinkSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView


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

