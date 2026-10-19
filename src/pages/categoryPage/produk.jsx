import { useState } from "react";
import { Card, Table, Button, Form } from "react-bootstrap";
import AppModal from "../../components/AppModal";

const dataProduk = [
    {
        id: 1,
        nama: "Nasi goreng",
        status: "Aktif",
    },
    {
        id: 2,
        nama: "Kopi",
        status: "Aktif",
    },
    {
        id: 3,
        nama: "Kentang goreng",
        status: "Aktif",
    },
    {
        id: 4,
        nama: "Salad",
        status: "Tidak Aktif",
    },
    {
        id: 5,
        nama: "Kopi Latte",
        status: "Aktif",
    },

];

const Produk = () => {

    const _initForm = {
        id: null,
        nama: "",
        status: "Aktif",
    };

    const [categories, setCategories] = useState(dataProduk);
    const [formData, setFormData] = useState(_initForm);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    // Buka modal tambah
    const handleOpenModal = () => {
        setShowModal(true);
        setFormData(_initForm);
        setIsEdit(false);
    };


    // Buka modal edit
    const handleEditModal = (category) => {
        setShowModal(true);
        setIsEdit(true);
        setFormData(category);
    };


    // Tutup modal
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData(_initForm);
    };


    // Input berubah
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // Simpan
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {

            // Update kategori
            setCategories(
                categories.map((category) =>
                    category.id === formData.id
                        ? formData
                        : category
                )
            );

        } else {

            // Tambah kategori
            const newCategory = {
                ...formData,
                id: Date.now(),
            };

            setCategories([
                ...categories,
                newCategory,
            ]);
        }

        setShowModal(false);
        setFormData(_initForm);
    };


    // Delete
    const handleDelete = (id) => {

        const confirmation = window.confirm(
            "Are you sure want to delete this product?"
        );

        if (confirmation) {
            setCategories(
                categories.filter(
                    (category) => category.id !== id
                )
            );
        }
    };


    return (
        <>
            <Card className="shadow-sm border-0">

                <Card.Body>

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <div>
                            <h4 className="mb-0 fw-bold">
                                Produk
                            </h4>

                            <small className="text-muted">
                                Kelola kategori menu Café
                            </small>
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleOpenModal}
                        >
                            Tambah Produk
                        </Button>
                    </div>


                    {/* Table */}
                    <Table
                        responsive
                        hover
                        className="align-middle mb-0"
                    >

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Menu</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={category.id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {category.nama}
                                    </td>
                                    <td>
                                        {category.status === "Aktif" ? (
                                            <span className="badge bg-success">
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Tidak Aktif
                                            </span>
                                        )}

                                    </td>
                                    <td>

                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() =>
                                                handleEditModal(category)
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(category.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>


            {/* Modal */}

            <AppModal
                show={showModal}
                onClose={handleCloseModal}
                title={
                    isEdit
                        ? "Edit Category"
                        : "Tambah Category"
                }
                onSubmit={handleSubmit}
                submitLabel={
                    isEdit
                        ? "Save Change"
                        : "Save"
                }
            >


                {/* Nama */}
                <Form.Group className="mb-3">

                    <Form.Label>
                        Nama Category
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="nama"
                        placeholder="Contoh: Makanan"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                    />

                </Form.Group>


                {/* Status */}
                <Form.Group className="mb-3">

                    <Form.Label>
                        Status
                    </Form.Label>

                    <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Aktif">
                            Aktif
                        </option>

                        <option value="Tidak Aktif">
                            Tidak Aktif
                        </option>

                    </Form.Select>

                </Form.Group>


            </AppModal>

        </>
    );
};

export default Produk;