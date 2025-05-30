from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import root_link, LinkViewSet, GoogleLogin

router = DefaultRouter()
router.register(r'links', LinkViewSet, basename='link')

urlpatterns = [
    path('', include(router.urls)),  # This will handle /links/
    path('<str:link_slug>/', root_link, name='root-link'),  # This will handle /<slug>/
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
]