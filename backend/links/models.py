from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model

User = get_user_model()

# save shortened  links - name, url, slug,  # of clicks
class Link(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='links',
        null=True,  # Allow null temporarily for migration
        blank=True  # Allow blank temporarily for migration
    )
    name = models.CharField(max_length=50, unique=True)
    url = models.URLField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    clicks = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.name} | {self.user.username if self.user else "No User"} | {self.clicks}'
    
    def click(self):
        self.clicks += 1
        self.save()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)
    