export const botonSuscribirStyle = {
    fontFamily: 'Montserrat',
    color: (suscrito) => (suscrito ? '#FFFFFF' : '#EE4296'),
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    marginTop: '0px',
    textTransform: 'none',
    borderRadius: '11px',
    borderColor: '#EE4296',
    width: '155px',
    height: '22px',
    marginBottom: '10px',
    backgroundColor: (suscrito) => (suscrito ? '#EE4296' : '#FFFFFF'),
  };

export const botonSuscritoStyle = {
    ...botonSuscribirStyle,
    color: '#FFFFFF',
    backgroundColor: '#EE4296',
}

export const botonNoSuscritoStyle = {
    ...botonSuscribirStyle,
    color: '#EE4296',
    backgroundColor: '#FFFFFF',
}