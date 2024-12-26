import { Resend } from 'resend';
import * as usuarioController from "./usuariosController"
import * as petController from "./petController"

const resend = new Resend('re_bNHAYx59_HGL8XGnJ7PqbFnuD1L68BagC');

type AlertInformer = {
  name: string,
  phone: number
}

async function sendMail(from: AlertInformer, to: number, petId: number , message: string){
    const userTo = await usuarioController.getUsuarioById(to);
    const petFound = await petController.getPets("id", petId);

    if(from && userTo && petFound){
      try{
        const mailSent = await resend.emails.send({
          from: 'Pet Finder App <alerts@resend.dev>',
          to: [`${userTo.email}`],
          subject: 'Tenés una alerta sobre tu mascota',
          html: /*html*/`
            <h2> Tenés una alerta sobre tu mascota </h2>
            <p>${from.name} reportó haber visto a ${petFound.nombre}</p>
            <p>Mensaje: ${message}</p>
            <br/>
            <p>Podes contactarte con ${from.name} a su teléfono: ${from.phone}</p>
          `,
        });
        return mailSent
      }
      catch(e){
        return e
      }
    }
}

export { sendMail }