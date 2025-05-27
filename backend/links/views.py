from django.shortcuts import get_object_or_404, redirect 
from rest_framework import viewsets
from .models import Link
from .serializers import LinkSerializer

def root_link(request, link_slug):
    link = get_object_or_404(Link, slug=link_slug)
    link.click()
    return redirect(link.url)

class LinkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows links to be viewed or edited.
    """
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
