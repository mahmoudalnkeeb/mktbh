const permissions = require('./configs/permissions');
const { createPermission } = require('./models/adminpanel/adminpanel');

for (const permission in permissions) {
  createPermission(permissions[permission]).then((perm) => console.log(perm));
}
