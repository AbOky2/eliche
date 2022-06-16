import React, { useState } from 'react';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Icon, Btn } from 'components';
import { ucfirst, stripTags } from 'helpers';
import styles from './styles';

const Copy = ({ data, classes }) => {
  const [isCopy, setIsCopy] = useState(false);

  return (
    <Grid
      container
      item
      alignItems="center"
      className={clsx(classes.copy, isCopy ? classes.copied : '')}
      onClick={() => {
        copy(stripTags(data));
        setIsCopy(true);
      }}
    >
      <Icon type={isCopy ? 'validate' : 'copy'} size="small" color="iconBlue" />
      {isCopy ? 'Copié' : 'Copier'}
    </Grid>
  );
};
const MailFormat = (str) => encodeURIComponent(stripTags(str));
const useStyles = makeStyles(styles);
const ReserveLocation = ({
  user = {},
  className,
  curr,
  residenceName,
  fullAddress,
  handleClose,
}) => {
  const classes = useStyles();
  const receiver = 'resa-studea@nexity.fr';
  const subject = `Kit le nid - Demande de location (<strong>LT${curr?.ref} - ${curr?.residence_ref}</strong> )`;
  const message = `Bonjour,<br/><br/>

Je me permets de vous contacter car je suis intéressé(e) par la location de la chambre étudiante dont la référence est <strong>${
    curr?.ref
  }</strong>, au sein de la résidence <strong>${ucfirst(
    residenceName
  )}</strong>  située à <strong>${fullAddress}</strong>, à compter du (../../..) et pour une durée de ... .<br/><br/>

Je reste à votre entière disposition pour échanger avec vous et vous transmettre les éléments nécessaires à mon dossier.
Vous pouvez me joindre sur mon portable au <strong>${
    user?.phone || '...'
  }</strong>.<br/><br/>

Bien cordialement,<br/><br/>
${ucfirst(user?.firstName)} ${ucfirst(user?.lastName)}`;
  const datas = [
    { label: 'Destinataire', data: receiver },
    { label: 'Objet', data: subject },
    { label: 'Message', data: message },
  ];

  return (
    <div>
      <Modal
        openModal={!!curr}
        showActions={false}
        showDivider={false}
        onClose={handleClose}
        title={
          <>
            Votre demande d’informations pré-remplie, à <br />
            envoyer à : resa-studea@nexity.fr
          </>
        }
        confirmText="Envoyer"
      >
        <Grid
          container
          item
          justify="center"
         // className="form-container"
          className={className}
        >
          <Grid container item className={classes.mail}>
            {datas.map(({ label, data }, key) => (
              <Grid key={key} container item xs={12}>
                <Grid item xs={12} md={2}>
                  <Typography variant="h4">{label}</Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={8}
                  dangerouslySetInnerHTML={{ __html: data }}
                />
                <Grid container item xs={4} md={2}>
                  <Copy data={data} classes={classes} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Btn
            text="Envoyer ma demande par email"
            href={`mailto:${receiver}?subject=${MailFormat(
              subject
            )}&body=${MailFormat(message)}`}
            target
          />
        </Grid>
      </Modal>
    </div>
  );
};
export default ReserveLocation;
