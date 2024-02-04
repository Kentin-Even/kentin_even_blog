import React from "react"

const UserList = ({ users, onEdit, onDelete, onToggleStatus }) => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isActive ? "Actif" : "Inactif"}</td>
            <td>
              <button onClick={() => onEdit(user.id)}>Éditer</button>
              <button onClick={() => onDelete(user.id)}>Supprimer</button>
              <button onClick={() => onToggleStatus(user.id)}>
                {user.isActive ? "Désactiver" : "Activer"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

export default UserList
