from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
import random

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

class PasswordResetOTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        # Check if OTP is less than 1 minute old and not used
        return (timezone.now() - self.created_at) < timedelta(minutes=1) and not self.is_used

    @classmethod
    def generate_otp(cls, email):
        # Delete any existing OTPs for this email
        cls.objects.filter(email=email).delete()
        
        # Generate a 6-digit OTP
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        
        # Create new OTP
        return cls.objects.create(email=email, otp=otp)
    