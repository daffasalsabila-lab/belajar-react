import { useState, useEffect } from "react";
const FormPeserta = ({ onSimpan, onCancel, pesertaEdit }) => {
        const [nama, setNama] = useState("");
        const [jurusan, setJurusan] = useState("");
        const [error, setError] = useState("");

    //useEffect : hasil request dari server menghasilkan sebuah data, dirender cuma 1 kali
    // useEffect(() => {
        // user
    // }, [user])

    useEffect(() => {
        if(pesertaEdit){
            // edit
            setNama(pesertaEdit.nama)
            setJurusan(pesertaEdit.jurusan)
        }else{
            // tambah
            setNama("")
            setJurusan("")
        }
    }, [pesertaEdit]);

    const handleSimpan = (e) => {
        e.preventDefault();
        if(!nama.trim() || !jurusan.trim()) {
            setError("Mohon isi nama dan jurusan");
            return;
        }
        onSimpan({
            id: pesertaEdit? pesertaEdit.id : Date.now(),
            nama,
            jurusan,
        });
        setNama("");
        setJurusan("");
    };
    return (
        <form 
        onSubmit={handleSimpan}
        method="post"
            style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #4f46e5 100%)",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "20px",
            }}
        >
            <h3>Tambah Peserta </h3>
            <div style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
            }}
            >
                <input 
                type="text" 
                placeholder="Nama Peserta"
                value={nama}
                onChange={(e) => setNama(e.target.value)} 
                style={{ 
                    padding: "8px",
                }}
                />
                <input 
                type="text" 
                placeholder="Jurusan" 
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                style={{
                    padding: "8px",
                }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#0d6efd",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "8px 16px",
                    }}
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default FormPeserta;