from django.contrib import admin
from .models import *

models = [UserProfile, Experience, Education, Skill, Project, Award, Certificate]
admin.site.register(models)
