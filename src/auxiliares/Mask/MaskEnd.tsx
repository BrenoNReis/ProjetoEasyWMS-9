import React, { useState } from 'react';

const AddressFormatter: React.FC = () => {
  const [address, setAddress] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setFormattedAddress(event.target.value.replace(/^(\d{1})-?(\d{2})-?(\d{3})-?(\d{2})$/g, 'D$1-R$2-B$3-P$4'));
  };

  return (
    <div>
      <input type="text" value={address} onChange={handleChange} />
      <p>{formattedAddress}</p>
    </div>
  );
};

export default AddressFormatter;

/*

if (bUsaWmsComMascara == true && optEndereco.Checked == true && e.KeyChar!=8)
            {
                //if (char.IsNumber(e.KeyChar) == true)
                //{
                    switch (txtConsulta.TextLength)
                    {
                        case 0:
                            txtConsulta.Text = "";
                            break;
                        case 2:
                            txtConsulta.Text += "-";
                            txtConsulta.SelectionStart = 4;
                            break;
                        case 6:
                            txtConsulta.Text += "-";
                            txtConsulta.SelectionStart = 8;
                            break;
                        case 11:
                            txtConsulta.Text += "-";
                            txtConsulta.SelectionStart = 13;
                            break;
                        default:
                            break;
                    }
                //}
            }


*/