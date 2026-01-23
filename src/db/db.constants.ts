export const TableNames = {
	Sample: "sample",
	Account: "account",
	Role: "role",
	Permission: "permission",
	RolePermission: "role_permission",
};

export const ColumnNames = {
	Global: {
		createdAt: "created_at",
		updatedAt: "updated_at",
		createdById: "created_by_id",
		updatedById: "updated_by_id",
		isActive: "is_active",
	},
	Sample: {
		id: "sample_id",
		name: "sample_name",
		age: "sample_age",
	},
	Account: {
		id: "account_id",
		ingameUuid: "ingame_uuid",
		email: "email",
		displayName: "display_name",
		password: "password",
		lastLoginAt: "last_login_at",
		isAdmin: "is_admin",
	},
	Role: {
		id: "role_id",
		name: "role_name",
	},
	Permission: {
		id: "permission_id",
		description: "permission_description",
		code: "permission_code",
		deprecated: "permission_deprecated",
	},
	RolePermission: {
		id: "role_permission_id",
	},
};

export const IndexNames = {
	Sample: {
		age: "idx_sample_sample_age",
	},
};
