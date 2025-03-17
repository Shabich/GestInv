import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function InfoForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: '',
    dateNaissance: '',
    ville: '',
    region: '',
    libCourt: '',
    libLong: '',
  })
  const [modifiedFields, setModifiedFields] = useState(new Set())

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setModifiedFields(prev => new Set(prev).add(name))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="flex flex-col px-96 py-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <TextField
            key={key}
            margin="dense"
            id={key}
            name={key}
            label={modifiedFields.has(key) ? <span style={{ color: 'red' }}>* {key}</span> : key}
            value={value}
            onChange={handleChange}
            fullWidth
            variant="standard"
            InputProps={{
              sx: {
                '&:focus-within:after': {
                  borderBottom: '2px solid red',
                },
              },
            }}
          />
        ))}
        <div className="flex justify-between mt-4">
          <Button>Annuler</Button>
          <Button type="submit">Sauvegarder</Button>
        </div>
      </form>
    </div>
  )
}

export default InfoForm
