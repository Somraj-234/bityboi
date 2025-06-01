from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib.auth import views as auth_views

schema_view = get_schema_view(
   openapi.Info(
      title="Your API",
      default_version='v1',
      description="Test description",
      contact=openapi.Contact(email="you@example.com"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('links.urls')),  # This will include all our API endpoints under /api/
    
    # Authentication URLs
    path('api/auth/', include('dj_rest_auth.urls')),  # login/logout/password reset
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # registration
    path('accounts/', include('allauth.urls')),
    
    # Password Reset URLs
    path('api/auth/password/reset/confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('api/auth/password/reset/complete/',
         auth_views.PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
    
    # Swagger docs at root
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

