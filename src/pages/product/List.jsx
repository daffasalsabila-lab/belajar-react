import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "../../components/AppModal";
import { CardHeader, CardTitle } from "react-bootstrap";
import api from "@/servicess/api.js";

// const dataUsers = [
//   {
//     id: 1,
//     name: "Reza",
//     email: "ribrahim50@gmail.com",
//     password: 12345678,
//   },
//   {
//     id: 2,
//     name: "Budi",
//     email: "budi@gmail.com",
//     password: 12345678,
//     // status: "Active"
//   },
//   {
//     id: 3,
//     name: "ani",
//     email: "ani@gmail.com",
//     password: 12345678,
//   },
// ];

const ProductPage = () => {
  const _initForm = {
    id: null,
    category_id: "",
    name: "",
    price: "",
    stock: "",
    description: "",
    is_active: 1,
  };

  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    try {
      // get All users
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCategories = async() => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // jika edit data
      const payload = {
        name: formData.name,
        category_id: formData.category_id,
        price: formData.price,
        description: formData.description,
        stock: formData.stock,
        is_active: parseInt(formData.is_active),
      };
      console.log(payload);
      if (isEdit) {
        // update data
        await api.put(`/product/${formData.id}`, payload);
        // setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        // insert data
        await api.post("/product", payload); 
        // const newUser = {
        //   ...formData,
        //   id: Date.now(),
        // };
        // setUsers([...users, newUser]);
      }
      setFormData(_initForm);
      await fetchProducts();

    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      // gagal/berhasil terseksuui
      setShowModal(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      // delete
      await api.delete(`/product/${id}`);
      fetchProducts();
    }
    // filter: users
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pd-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Product</CardTitle>
          </div>
          <Button onClick={handleOpenModal}>
            Create New Product
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data Product</h4>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="text-center px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length > 0 ? (
                products.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.category_name}</td>
                    <td>{row.price}</td>
                    <td>{row.stock}</td>
                    <td>
                      <span className=
                      {`border rounded-md p-2 px-6 ${row.is_active === 1 ? "bg-green-600" : "bg-red-600"} text-white`}>
                        {row.is_active === 1 ? "Active" : "In-Active"}
                        </span></td>
                    <td className="px-4 py-6 text-center whitespace-nowrap">
                      <Button onClick={() => handleEditModal(row)} size="sm" className="me-2 rounded-md bg-green-600">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(row.id)} variant="destructive" size="sm" className="me-2 rounded-md">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Product not founds
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
            <Label>Category</Label>
            <Select value={formData.category_id} onValueChange={(val) => setFormData({ ...formData, category_id: val })} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select On.." />
              </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name"
              name="name"
              value={formData.name} onChange={handleChange} required
              placeholder="Enter your name" />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>
            <Input type="number"
              id="price"
              name="price"
              value={formData.price} onChange={handleChange} required
              placeholder="Enter your price" />
          </div>

          <div className="space-y-2">
            <Label>Stock</Label>
            <Input type="stock"
              name="stock"
              value={formData.stock} onChange={handleChange} required = { isEdit ? false: true }
              placeholder="Enter your stock" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input type="description"
              name="description"
              value={formData.description} onChange={handleChange} required = { isEdit ? false: true }
              placeholder="Enter your description" />
          </div>

          {isEdit ? (
            <div className="space-y-2">
              <Label>Activation</Label>
              <div>
                <RadioGroup
                  value={String(formData.is_active)}
                  onValueChange={(val) =>
                    setFormData({ ...formData, is_active: parseInt(val) })
                  }
                  className="w-fit flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="active" />
                    <Label htmlFor="active">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="inactive" />
                    <Label htmlFor="inactive">In-Active</Label>
                  </div>
                </RadioGroup>

              </div>
            </div>
          ) : (
            ""
          )} 

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

export default ProductPage;
