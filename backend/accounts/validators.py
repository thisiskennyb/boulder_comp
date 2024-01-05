from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomPasswordValidator:
    def __init__(self, min_length=8):
        self.min_length = min_length

    def validate(self, password, user=None):
        # Check minimum length
        if len(password) < self.min_length:
            raise ValidationError(
                _("This password must contain at least %(min_length)d characters."),
                code="password_too_short",
                params={"min_length": self.min_length},
            )

        # Check for at least one digit
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                _("The password must contain at least one digit."),
                code="password_no_digit",
            )

        # Check for at least one lowercase letter
        if not any(char.islower() for char in password):
            raise ValidationError(
                _("The password must contain at least one lowercase letter."),
                code="password_no_lowercase",
            )

        # Check for at least one uppercase letter
        if not any(char.isupper() for char in password):
            raise ValidationError(
                _("The password must contain at least one uppercase letter."),
                code="password_no_uppercase",
            )
        
        if not any(char for char in password if char.isascii() and not char.isalnum()):
            raise ValidationError(
                _("This password must contain at least one special character."),
                code='password_no_special_character',
            )

    def get_help_text(self):
        return _(
            "Your password must meet the following criteria:\n"
            "- Contain at least %(min_length)d characters.\n"
            "- Contain at least one digit.\n"
            "- Contain at least one lowercase letter.\n"
            "- Contain at least one uppercase letter."
            % {"min_length": self.min_length}
        )