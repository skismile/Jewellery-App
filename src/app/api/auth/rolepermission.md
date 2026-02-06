# 🛡️ RBAC Role Management — Final Production Plan

**Project:** Jewellery Marketplace App  
**Stack:** Node.js + PostgreSQL  
**Architecture:** Role-Based Access Control (RBAC)  
**Design Goal:** Multi-role + permission-driven + scalable + secure + production-ready

---

# 🎯 Objectives

- Support single user with multiple roles
- Default role = Buyer
- Role upgrade path (Buyer → Seller → Entity → Admin)
- Permission-based authorization
- Role approval workflow
- No permission duplication
- High-performance access checks
- Soft delete + audit support
- Future role extensibility
- JWT permission caching

---

# 🧱 Core Tables

## 👤 users

Single source of truth for authentication.

| Field | Type | Notes |
|--------|--------|--------|
id | UUID PK | Primary key |
name | VARCHAR | Full name |
email | VARCHAR UNIQUE | Indexed |
phone | VARCHAR UNIQUE | Indexed |
password_hash | TEXT | Encrypted |
status | VARCHAR | active / blocked / suspended |
is_email_verified | BOOLEAN | |
is_phone_verified | BOOLEAN | |
created_at | TIMESTAMP | |
updated_at | TIMESTAMP | |
deleted_at | TIMESTAMP NULL | Soft delete |
created_by | UUID | Audit |
updated_by | UUID | Audit |

Indexes:
- UNIQUE(email)
- UNIQUE(phone)

---

## 🎭 roles

System roles with priority ordering.

| Field | Type | Notes |
|--------|--------|--------|
id | SMALLINT PK | |
name | VARCHAR UNIQUE | |
description | TEXT | |
priority | SMALLINT | Higher = stronger role |
is_system | BOOLEAN | System protected role |

### Seed Roles

| Role | Priority |
|--------|------------|
buyer | 10 |
seller | 40 |
entity | 60 |
admin | 80 |
super_admin | 100 |

---

## 🔗 user_roles

Many-to-many mapping with approval workflow.

| Field | Type | Notes |
|--------|--------|--------|
id | UUID PK | |
user_id | UUID FK | → users.id |
role_id | SMALLINT FK | → roles.id |
status | VARCHAR | active / pending / rejected / suspended |
approved_by | UUID | Admin user |
approved_at | TIMESTAMP | |
created_at | TIMESTAMP | |

Constraints:
- UNIQUE(user_id, role_id)

Indexes:
- INDEX(user_id)
- INDEX(role_id)

---

# 👥 Role Profile Tables

Each role has its own profile table for clean separation and performance.

---

## 🧑 buyer_profiles

| Field | Type |
|--------|--------|
id | UUID PK |
user_id | UUID UNIQUE FK |
wallet_balance | NUMERIC |
preferences | JSONB |
loyalty_points | INT |
created_at | TIMESTAMP |

---

## 🛍 seller_profiles

| Field | Type |
|--------|--------|
id | UUID PK |
user_id | UUID UNIQUE FK |
store_name | VARCHAR |
store_slug | VARCHAR UNIQUE |
gst_number | VARCHAR |
kyc_status | VARCHAR |
kyc_verified_at | TIMESTAMP |
kyc_verified_by | UUID |
rating | NUMERIC |
commission_rate | NUMERIC |
is_active | BOOLEAN |
deleted_at | TIMESTAMP |

Indexes:
- UNIQUE(store_slug)

---

## 🏢 entity_profiles

| Field | Type |
|--------|--------|
id | UUID PK |
user_id | UUID UNIQUE FK |
entity_name | VARCHAR |
entity_slug | VARCHAR UNIQUE |
registration_no | VARCHAR |
verified | BOOLEAN |
verified_at | TIMESTAMP |
deleted_at | TIMESTAMP |

Indexes:
- UNIQUE(entity_slug)

---

# 🔐 Permission System

## 🧾 permissions (Master Table)

Central permission registry — no duplication allowed.

| Field | Type |
|--------|--------|
id | SMALLINT PK |
permission_key | VARCHAR UNIQUE |
permission_group | VARCHAR |
description | TEXT |
is_active | BOOLEAN |

Example keys:
- view_products
- create_product
- manage_users
- manage_orders

---

## 🔗 role_permissions

Role ↔ permission mapping.

| Field | Type |
|--------|--------|
role_id | SMALLINT FK |
permission_id | SMALLINT FK |
created_at | TIMESTAMP |

Constraints:
- UNIQUE(role_id, permission_id)

Indexes:
- INDEX(role_id)
- INDEX(permission_id)

---

# 📊 Permission Groups

Recommended permission grouping:

- product
- cart
- order
- payment
- review
- user
- store
- inventory
- analytics
- finance
- dispute
- brand
- system
- role
- staff

---

# 👑 Super Admin Rule

Super admin gets wildcard permission:

```
permission_key = "*"
```

Middleware should auto-allow all actions.

---

# 🔄 Role Upgrade Flow

## Buyer → Seller

1. User applies seller role
2. Insert into user_roles with status = pending
3. Submit KYC + GST data
4. Admin verifies
5. status → active
6. seller_profile created

---

## Seller → Entity

1. Entity registration submitted
2. Legal docs verified
3. Entity profile created
4. Role activated

---

# 🔐 JWT Strategy (Performance Critical)

Store resolved permissions inside JWT.

## JWT Claims Example

```json
{
  "user_id": "uuid",
  "roles": ["buyer", "seller"],
  "primary_role": "seller",
  "permissions": [
    "create_product",
    "update_product",
    "view_orders"
  ]
}
```

## Refresh JWT When

- Role assigned/revoked
- Permission changed
- Account status changed

---

# ⚡ Permission Resolution Query

```sql
SELECT p.permission_key
FROM permissions p
JOIN role_permissions rp ON rp.permission_id = p.id
JOIN user_roles ur ON ur.role_id = rp.role_id
WHERE ur.user_id = $1
AND ur.status = 'active';
```

Cache result → JWT.

---

# 🧠 Primary Role Resolution

```sql
SELECT r.name
FROM roles r
JOIN user_roles ur ON ur.role_id = r.id
WHERE ur.user_id = $1
AND ur.status = 'active'
ORDER BY r.priority DESC
LIMIT 1;
```

---

# 🧩 Node.js Middleware Pattern

## Require Permission Middleware

```js
function requirePermission(permission) {
  return (req, res, next) => {
    const perms = req.user.permissions || [];

    if (perms.includes('*') || perms.includes(permission)) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden' });
  };
}
```

Usage:

```js
router.post(
  "/products",
  requirePermission("create_product"),
  controller.createProduct
);
```

---

# 🛠 Default User Creation Flow

On signup:

1. Create user
2. Assign buyer role
3. Create buyer_profile
4. Issue JWT with buyer permissions

---

# 🧾 Audit & Compliance Additions

Recommended audit tables:

- login_history
- role_change_logs
- permission_change_logs
- kyc_verification_logs

Fields:

- actor_id
- target_user_id
- action
- before_json
- after_json
- timestamp

---

# 🚀 Performance Optimizations

- Index all FK columns
- Cache permissions in JWT
- Avoid permission string duplication
- Use SMALLINT for role/permission IDs
- Separate role profile tables
- Soft delete instead of hard delete

---

# ✅ Final Architecture Verdict

| Area | Status |
|------------|------------|
Multi-role support | ✅ |
Permission-based RBAC | ✅ |
Scalable schema | ✅ |
Marketplace ready | ✅ |
Audit ready | ✅ |
JWT optimized | ✅ |
Production safe | ✅ |

---

**This RBAC design is production-ready and enterprise scalable.**
