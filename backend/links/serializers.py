from rest_framework import serializers
from .models import Link, PasswordResetOTP
from django.utils import timezone
from datetime import timedelta

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'name', 'url', 'slug', 'clicks']  # exclude 'user'

    def create(self, validated_data):
        # No need to manually set user here, handled in perform_create
        return super().create(validated_data)

class RequestOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)

    def validate(self, data):
        email = data.get('email')
        otp = data.get('otp')

        try:
            otp_obj = PasswordResetOTP.objects.get(
                email=email,
                otp=otp,
                is_used=False,
                created_at__gte=timezone.now() - timedelta(minutes=1)
            )
        except PasswordResetOTP.DoesNotExist:
            raise serializers.ValidationError("Invalid or expired OTP")

        return data

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(min_length=8)
    confirm_password = serializers.CharField(min_length=8)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
