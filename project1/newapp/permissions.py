from rest_framework import permissions

class IsMyselfToRetrieveUpdateDestroy(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        """自身のみがGET（詳細）・PUT・PATCH・DELETE許可"""
        return obj == request.user