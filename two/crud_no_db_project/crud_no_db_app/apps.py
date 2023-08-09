from django.apps import AppConfig


class CrudNoDbAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'crud_no_db_app'
