import { useState } from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import { Peserta } from './components/Peserta';
import DataPeserta from './components/DataPeserta';
import FormPeserta from './components/FormPeserta';


function App() {
  // desctruct
  // const siswa = {
  //   nama: "Reza",
  //   nilai: 50,
  // };
  // const { nama, nilai } = siswa;
  // const.lo(nama);
  // const.lo(nilai);

  // <NewPeserta nama="Budi" jurusan="web" />;
  const [listPeserta, setListPeserta] = useState(Peserta);
  const [editPeserta, setEditPeserta] = useState(null);

  // const listPeserta = Peserta;

  const handleSubmit = (dataPeserta) => {
    if (editPeserta) {
        setListPeserta(listPeserta.map((item) => (item.id === dataPeserta.id? dataPeserta : item)));
        setEditPeserta(null);
    } else {
      setListPeserta([...listPeserta, dataPeserta])

    }
    console.log(dataPeserta);
  };

  const handleHapus = (id) => {
    setListPeserta(listPeserta.filter((item) => item.id !== id));
    if (id == editPeserta.id){
      setListPeserta(null);
    }
  };

  return (
    <>

      <FormPeserta onSimpan={handleSubmit} pesertaEdit={editPeserta} />
      {/* map: looping jg */}

      {listPeserta.map((item) => (
          <DataPeserta key={item.id} peserta={item} onEdit={setEditPeserta} onHapus={handleHapus} />
        ))}
    </>

  )
}
export default App