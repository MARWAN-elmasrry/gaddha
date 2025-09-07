import Modal from "../../../ui/Modal";
import "./UserForm.css";

const UserForm = ({ user, open, handleClose }) => {
  if (!user) return null;

  const title = `عرض المستخدم`;

  return (
    <Modal title={title} isOpen={open} onClose={handleClose}>
      <div className="user-form">
        <div className="user-field">
          <span className="label">ID:</span>
          <span className="value">{user._id}</span>
        </div>

        <div className="user-field">
          <span className="label">الاسم:</span>
          <span className="value">{user.name}</span>
        </div>

        <div className="user-field">
          <span className="label">اسم المستخدم:</span>
          <span className="value">{user.username}</span>
        </div>

        <div className="user-field">
          <span className="label">الإيميل:</span>
          <span className="value">{user.email}</span>
        </div>

        <div className="user-field">
          <span className="label">تاريخ الميلاد:</span>
          <span className="value">{new Date(user.birthday).toLocaleDateString("ar-EG")}</span>
        </div>

        <div className="user-field">
          <span className="label">الموبايل:</span>
          <span className="value">
            {user.countryCode} {user.phone}
          </span>
        </div>

        <div className="user-field">
          <span className="label">الرصيد:</span>
          <span className="value">{user.coins.toLocaleString()} 🪙</span>
        </div>

        <div className="user-field">
          <span className="label">عدد المشتريات:</span>
          <span className="value">{user.purchases}</span>
        </div>

        <div className="user-field">
          <span className="label">آخر تسجيل دخول:</span>
          <span className="value">{new Date(user.lastLogin).toLocaleString("ar-EG")}</span>
        </div>

        <div className="user-field">
          <span className="label">الحالة:</span>
          <span className={`status ${user.isVerified ? "verified" : "not-verified"}`}>
            {user.isVerified ? "مفعل ✅" : "غير مفعل ❌"}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default UserForm;
