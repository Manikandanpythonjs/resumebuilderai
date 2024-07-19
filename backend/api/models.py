from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField


class UserProfile(models.Model):
    userId = models.CharField()
    resume_Id = models.CharField(
        primary_key=True, unique=True, blank=False, null=False, max_length=255
    )

    userName = models.CharField(max_length=50, default=None)
    resumeTitle = models.CharField(blank=False, null=False, max_length=100)
    firstName = models.CharField(max_length=20, default=None, blank=True, null=True)
    lastName = models.CharField(max_length=20, default=None, blank=True, null=True)
    email = models.EmailField(default=None, blank=True, null=True)
    phone = models.CharField(max_length=20, default=None, blank=True, null=True)
    address = models.CharField(max_length=255, default=None, blank=True, null=True)
    linkedin = models.CharField(default=None, blank=True, null=True)
    github = models.CharField(default=None, blank=True, null=True)
    website = models.CharField(default=None, blank=True, null=True)
    jobTitle = models.CharField(max_length=100, default=None, blank=True, null=True)
    summary = models.TextField(default=None, blank=True, null=True)
    themeColor = models.CharField(default="#ff6666")

    def __str__(self):
        return f"{self.resumeTitle} {self.resume_Id}"


class Experience(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="experiences", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    startDate = models.DateField()
    endDate = models.DateField(blank=True, null=True)
    isWorkin = models.BooleanField(default=False)
    description = models.TextField()

    def __str__(self):
        return self.title


class Project(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="projects", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    technologies = ArrayField(models.CharField(max_length=100), blank=True, null=True)

    def __str__(self):
        return self.title


class Skill(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="skills", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    rating = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Education(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="education", on_delete=models.CASCADE
    )
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    startDate = models.DateField()
    endDate = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.degree


class Award(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="awards", on_delete=models.CASCADE
    )
    awardsTitle = models.CharField(max_length=255)
    year = models.CharField(max_length=4)
    description = models.TextField()

    def __str__(self):
        return self.awardsTitle


class Certificate(models.Model):
    user_profile = models.ForeignKey(
        UserProfile, related_name="certificates", on_delete=models.CASCADE
    )
    certificateName = models.CharField(max_length=255)
    startDate = models.DateField()
    endDate = models.DateField()
    description = models.TextField()

    def __str__(self):
        return self.certificateName
