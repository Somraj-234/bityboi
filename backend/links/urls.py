from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import root_link, LinkViewSet, GoogleLogin
from . import views

router = DefaultRouter()
router.register(r'links', LinkViewSet, basename='link')

urlpatterns = [
    path('', include(router.urls)),  # This will handle /links/
    path('<str:link_slug>/', root_link, name='root-link'),  # This will handle /<slug>/
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    # Password Reset OTP URLs
    path('auth/password/reset/otp/', views.request_password_reset_otp, name='request_password_reset_otp'),
    path('auth/password/reset/verify/', views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/password/reset/', views.ResetPasswordView.as_view(), name='reset_password'),
]