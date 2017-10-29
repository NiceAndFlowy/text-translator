from django.db import models

# Create your models here.
class Translation(models.Model):
    inputText = models.CharField(max_length=5000)
    detectedLanguage = models.CharField(max_length=25)
    translatedText = models.CharField(max_length=5000)

    def __str__(self):
        return self.translatedText