from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import root_link, LinkViewSet

router = DefaultRouter()
router.register(r'links', LinkViewSet)

urlpatterns = [
    path('', include(router.urls)),  # This will handle /api/links/
    path('<str:link_slug>/', root_link, name='root-link'),  # This will handle /api/<slug>/
]