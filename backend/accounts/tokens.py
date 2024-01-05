from django.contrib.auth.tokens import PasswordResetTokenGenerator

class TokenGenerator(PasswordResetTokenGenerator):
    def make_token(self, user):
        return super().make_token(user)

email_verification_token = TokenGenerator()
