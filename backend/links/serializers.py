from rest_framework import serializers
from .models import Link

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'name', 'url', 'slug', 'clicks']  # exclude 'user'

    def create(self, validated_data):
        # No need to manually set user here, handled in perform_create
        return super().create(validated_data)
