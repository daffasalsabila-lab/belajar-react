import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "../../components/AppModal";
import { CardHeader, CardTitle } from "react-bootstrap";

const dataUsers = [
  {
    id: 1,
    name: "Reza",
    email: "ribrahim50@gmail.com",
    password: 12345678,
  },
  {
    id: 2,
    name: "Budi",
    email: "budi@gmail.com",
    password: 12345678,
    // status: "Active"
  },
  {
    id: 3,
    name: "ani",
    email: "ani@gmail.com",
    password: 12345678,
  },
];

const ListUser = () => {
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    status: "Active"
  };

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(dataUsers);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) => {
    console.log(user);
    setShowModal(true);
    setIsEdit(true);
    setFormData(user);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // jika edit data
    if (isEdit) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
      };

      setUsers([...users, newUser]);
      setFormData(_initForm);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      setUsers(users.filter((u) => u.id !== id));
    }
    // filter: users
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pd-4">
          <div>
            <CardTitle className="text-xl font-bold">Data User</CardTitle>
          </div>
          <Button onClick={handleOpenModal}>
            Create New User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data User</h4>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.status}</td> */}
                    <td>Active</td>
                    <td className="px-4 py-6 text-right whitespace-nowrap">
                      <Button onClick={() => handleEditModal(user)} variant="warning" size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" placeholder="Enter your email" required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Enter your passwod" required></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New User"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Change" : "Save"}>

{/* cara 1 */}

<div className="space-y-4">
  <div className="space-y-2">
    <Label>Name</Label>
    <Input id="name" 
    name="name"
    value={formData.name} onChange={handleChange} required
    placeholder="Enter your name" />
  </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email"
            id="email"
              name="email"
              value={formData.email} onChange={handleChange} required
              placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password"
              name="password"
              value={formData.password} onChange={handleChange} required
              placeholder="Enter your password" />
          </div>
{/* <div className="space-y-2">
  <Button></Button>
</div> */}

</div>

{/* cara 2 */}

          {/* <div className="mb-3">
            <Label>Name</Label>
            <Input type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Input>
          </div>
          <div className="mb-3">
            <Label>Email</Label>
            <Input value={formData.email} onChange={handleChange} type="email" name="email" placeholder="Enter your email" required></Input>
          </div>
          <div className="mb-3">
            <Label>Password</Label>
            <Input value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Enter your passwod" required></Input>
          </div> */}

          <div className="mb-3">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select One</option>
              <option value="Active">Publish</option>
              <option value="In Active">Draft</option>
            </select>
          </div>

      </AppModal>
    </>
  );
};

export default ListUser;
