from .models import Translation
from rest_framework import serializers


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = ('inputText', 'detectedLanguage', 'translatedText')
