import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
// import AppModal from "../../components/AppModal";
// import { CardHeader, CardTitle } from "react-bootstrap";
import api from "@/servicess/api.js";

// const datatransactions = [
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

const FormTransaction = () => {
    const _initForm = {
        id: null,
        name: "",
        email: "",
        password: "",
        is_active: 1,
    };

    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [cashAmount, setCashAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            // get All transactions
            const response = await api.get("/product");
            setProducts(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prev) => {
            console.log("prev", prev);
            const ext = prev.find((item) => item.id === product.id);
            if (ext) {
                if (ext.qty >= product.stock) return prev;
                return prev.map((item) => {
                    return item.id === product.id ? { ...item, qty: item.qty + 1 } : item;
                });
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    const updateQty = (id, qty) => {
        let nextQty = "";
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id === id){
                    nextQty = item.qty + qty;
                    return nextQty > 0 && nextQty <= item.stock ? {...item, qty: nextQty} : item;
                }
                return item;
            })
                .filter((item) => item.qty > 0); 
        });
    };

    console.log("cart", cart);

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
                email: formData.email,
                password: formData.password,
                is_active: parseInt(formData.is_active),
            };
            if (isEdit) {
                // update data
                await api.put(`/user/${formData.id}`, payload);
                // setTransactions(transactions.map((user) => (user.id === formData.id ? formData : user)));
            } else {
                // insert data
                await api.post("/user", payload);
                // const newUser = {
                //   ...formData,
                //   id: Date.now(),
                // };

                // setTransactions([...transactions, newUser]);
            }
            setFormData(_initForm);
        } catch (error) {
            const errMsg = error.message;
            console.log(errMsg);
        } finally {
            fetchTransaction();
            setShowModal(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure want to delete this data?");
        if (confirmation) {
            // delete
            await api.delete(`/user/${id}`);
            fetchTransaction();
        }
        // filter: transactions
    };

    return (
        <>
            <div className="grid grid-col-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                    <Card className="shadow-sm border-border p-6">
                        <CardHeader className="py-4 px-5 border-b">
                            <CardTitle className="text-sm font-semibold">Available Product</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[620px]">
                            {products.map((item) => (
                                <button
                                    onClick={() => addToCart(item)}
                                    key={item.id}
                                    className="flex flex-col justify-between p-3.5 rounded-lg border border-border/80 bg-card hover:border-primary/60 text-left transition-all group">
                                    <div>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{item.category_name}</span>
                                        <h4 className="font-semibold text-sm line-clamp-1 mt-0.5 group-hover:text-primary">
                                            {item.name}
                                        </h4>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <span className="font-medium text-xs">
                                            {Number(item.price).toLocaleString("id-ID",
                                                { style: "currency", currency: "IDR" })}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground">100</span>
                                    </div>
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5">
                    <Card className="border border-border/80 shadow">
                        <CardHeader className="py-4 px-5 border-b">
                            <CardTitle className="text-sm font-semibold">Summary Cart</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">

                            <div className="space-y-3 overflow-y-auto divide-y divide-border/60">
                                {cart.map((item, index) => (
                                    <div key={index} className="space-y-3">

                                        <div key={item.id}>
                                            <div className="pt-5 flex-1 items-center justify-between text-sm">
                                                <p className="font-medium text-xs">{item.name}</p>
                                                <p className="text-[11px] text-muted-foreground">{Number(item.price).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>

                                        <div clasName="flex items-center">
                                            <Button onClick={() => updateQty(item.id, -1)} variant="outline" size="sm" className="h-6 w-6 p-0 text-xs mr-2">
                                                 - 
                                                </Button>
                                            <span className="w-6 text-center text-xs font-mono font-medium mx-2">
                                                {/* <input type="number" name="qty" value={item.qty} */}
                                                {item.qty}
                                                </span>
                                            <Button onClick={() => updateQty(item.id, 1)} variant="outline" size="sm" className="h-6 w-6 p-0 text-xs mx-2">
                                                 + 
                                                </Button>
                                            <Button onClick={() => removeItem(item.id)} variant="outline" size="sm" 
                                            className="h-6 w-6 p-0 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                                                 x 
                                                </Button>
                                        </div>
                                    </div>
                                ))}
                                        <div className="space-y-1">
                                            <Label className="text-sm">Payment Method</Label>
                                            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                                <SelectTrigger id="payment" className="h-8 text-xs w-full">
                                                    {/* <SelectValue>Select One</SelectValue> */}
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="qris">Qris</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {paymentMethod === "cash" && (
                                        <div className="space-y-1">
                                            <Label className="text-xs">Pay</Label>
                                            <Input className="h-8 text-xs" 
                                            id="cash" type="number" 
                                            placeholder="Enter your cash" size="sm" value={cashAmount} 
                                            onChange={(e) => setCashAmount(e.target.value) } />
                                        </div>
                                        )}
                                        <div className="space-y-1.5 pt-3 border-t text-xs">
                                            <div className="flex justify-between font-semibold text-sm">
                                                <span>Total</span>
                                                <span>
                                                    Rp.100.000
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>Change</span>
                                                <span>Rp.100.000</span>
                                            </div>
                                        </div>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t">
                            <Button className="w-full text-xs font-semibold">
                                {loading ? "Loading..." : "Save Transaction"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default FormTransaction;