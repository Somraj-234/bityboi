from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

class NoSignupRedirectAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        print("NoSignupRedirectAdapter: is_open_for_signup called")
        return True  # Always allow signup, never redirect 