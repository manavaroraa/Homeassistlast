import { withRouter } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import StarInput from "./StarInput";
import MyInput from "../RegisterWizard/MyInput";
import styled from "styled-components";
import { Avatar, Box } from "@chakra-ui/react";
import MyButton from "../RegisterWizard/MyButton";
import { useActions, useStore } from "../../configureStore";
import useWindowSize from "../../hooks/useWIndowSize";
import Logo from "../../assets/images/logo-assist4.jpg";
import LanguageContext from "../../providers/languageProvider";

const Edit = (props) => {
  const { model, isPlataformReview, workerId = 0 } = props;

  const { lang } = useContext(LanguageContext);

  const { width } = useWindowSize();
  const isAuth = useStore((state) => state.auth.isAuthenticated);
  const create = useActions((action) => action.review.create);
  const update = useActions((action) => action.review.update);

  const getProfessional = useActions(
    (action) => action.professional.getProfessional
  );
  const worker = useStore((state) => state.professional.professional);

  useEffect(() => {
    if (workerId) {
      getProfessional(workerId);
    }
  }, [workerId]);

  const formik = useFormik({
    initialValues: {
      id: model?.id || 0,
      star: model?.star || 0,
      star_personality: model?.star_personality || 0,
      star_ethic: model?.star_ethic || 0,
      star_follow_instructions: model?.star_follow_instructions || 0,
      star_deadlines: model?.star_deadlines || 0,
      star_quality: model?.star_quality || 0,
      star_punctuality: model?.star_punctuality || 0,

      title: model?.title || "",
      description: model?.description || "",
      work_id: model?.work_id || workerId || 0,
      user_id: model?.user_id || 0,
      is_plataform_review:
        model?.is_plataform_review || isPlataformReview || false,
    },
    validate: (values) => {
      let err = {};
      const message = lang?.tooltips?.requiredField;

      if (!values.star) err.star = message;
      if (!values.description) {
        if (values.description.length > 1000)
          err.description = "No máximo 1000 caracteres";
      }
      return err;
    },
    onSubmit: async (values, { setSubmitting }) => {
      const auth = JSON.parse(localStorage.getItem("4you_auth"));
      if (values.work_id == 0) values.work_id = null;
      if (values.user_id == 0) values.user_id = auth?.user?.id;
      if (!values.title)
        values.title = values.is_plataform_review
          ? "Avaliação da Plataforma"
          : "Avaliação de Trabalhador";

      if (values.id > 0) update({ id: values.id, model: values });
      else create(values);

      setSubmitting(false);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box
          padding={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
        >
          {formik.values.is_plataform_review && (
            <>
              <h2>Obrigado por avaliar a plataforma HomeAssist4u.</h2>
              <img
                height="55"
                src={Logo}
                alt="HomeAssist4u"
                onClick={() => props.history.push("/")}
              />
              <h3>
                Forneça detalhes de sua experiência na plataforma HomeAssist4u!
              </h3>
            </>
          )}
          {!formik.values.is_plataform_review && (
            <>
              <h2>
                Obrigado por contratar um trabalhador da plataforma
                HomeAssist4u.
              </h2>
              {worker?.image?.length > 0 && (
                <CustomAvatar
                  size="2xl"
                  name={worker?.name}
                  src={
                    worker?.image?.length > 0
                      ? `${process.env.REACT_APP_ASSETS_BUCKET}/users/${worker?.image}`
                      : null
                  }
                />
              )}

              <h3>
                <p>{`Forneça uma avaliação ao trabalhador ${
                  worker?.name ?? ""
                } e da qualidade do trabalho após a conclusão do trabalho.`}</p>
                <p>
                  Isso é muito importante para o perfil do trabalhador, pois sua
                  avaliação será vista por potenciais futuros contratantes, caso
                  deseje adicionar fotos do trabalho realizado se for o caso.
                </p>
              </h3>
              <h5>
                Exemplo: um trabalho de reforma ou paisagismo antes e depois.
              </h5>
            </>
          )}
        </Box>
        <Grid width={width}>
          <StarInput
            label="Avaliação"
            value={formik.values.star}
            onChange={(e) => {
              formik.setFieldValue("star", e);
            }}
            infoMessage={
              !formik.values.is_plataform_review
                ? `1 estrela - muito ruim;
            2 estrelas - poderia ser melhor;
            3 estrelas - bom, precisa de melhorias;
            4 estrelas - bom;
            5 estrelas - excelente;`
                : `1 estrela - muito ruim;
            2 estrelas - difícil de fluir;
            3 estrelas - ótimo, mas pode ser melhor;
            4 estrelas - bom;
            5 estrelas - muito bom;`
            }
            err={
              formik.errors.star && formik.touched.star && formik.errors.star
            }
          />
        </Grid>
        <Box padding={"1rem"}>
          <MyInput
            isInvalid={
              !!formik.errors.description &&
              formik.touched.description &&
              !!formik.errors.description
            }
            area={true}
            maxlength={1000}
            err={
              formik.errors.description &&
              formik.touched.description &&
              formik.errors.description
            }
            label="Mais detalhes"
            name="description"
            placeholderTemplate=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            infoMessage="Forneça detalhes de sua experiência ou sugestões na caixa de texto abaixo para melhorar nossos serviços (até 1000 caracteres)."
          />
        </Box>
        <Grid width={width}>
          {!formik.values.is_plataform_review && (
            <>
              <StarInput
                label="Personalidade"
                value={formik.values.star_personality}
                onChange={(e) => {
                  formik.setFieldValue("star_personality", e);
                }}
                infoMessage={`1 estrela - muito difícil;
              2 estrelas - difícil;
              3 estrelas - um pouco profissional;
              4 estrelas - profissional;
              5 estrelas - muito profissional;`}
              />
              <StarInput
                label="Ética de trabalho"
                value={formik.values.star_ethic}
                onChange={(e) => {
                  formik.setFieldValue("star_ethic", e);
                }}
                infoMessage={`1 estrela - muito antiético;
              2 estrelas - antiético;
              3 estrelas - um pouco ético;
              4 estrelas - ético;
              5 estrelas - muito ético;`}
              />
              <StarInput
                label="Segue instruções"
                value={formik.values.star_follow_instructions}
                onChange={(e) => {
                  formik.setFieldValue("star_follow_instructions", e);
                }}
                infoMessage={`1 estrela - de jeito nenhum;
              2 estrelas - um pouco;
              3 estrelas - sim;
              4 estrelas - melhorias feitas;
              5 estrelas - além das expectativas;`}
              />
              <StarInput
                label="Prazos"
                value={formik.values.star_deadlines}
                onChange={(e) => {
                  formik.setFieldValue("star_deadlines", e);
                }}
                infoMessage={`1 estrela - não cumpriu o combinado;
              2 estrelas - necessárias para refazer;
              3 estrelas - com atrasos;
              4 estrelas - conforme combinado;
              5 estrelas - antes do combinado;`}
              />
              <StarInput
                label="Qualidade do trabalho"
                value={formik.values.star_quality}
                onChange={(e) => {
                  formik.setFieldValue("star_quality", e);
                }}
                infoMessage={`1 estrela - inaceitável;
              2 estrelas - aceitável;
              3 estrelas - bom;
              4 estrelas - muito bom;
              5 estrelas - excelente;`}
              />
              <StarInput
                label="Pontualidade"
                value={formik.values.star_punctuality}
                onChange={(e) => {
                  formik.setFieldValue("star_punctuality", e);
                }}
                infoMessage={`1 estrela - muito não pontual;
              2 estrelas - não pontual;
              3 estrelas - um pouco pontual;
              4 estrelas - pontual;
              5 estrelas - muito pontual;`}
              />
            </>
          )}
        </Grid>
        <Box padding={"1em"} display={"flex"}>
          <MyButton
            disabled={formik.isSubmitting || !isAuth}
            className="next"
            description={"Avaliar"}
          />
        </Box>
      </form>
    </div>
  );
};

export default withRouter(Edit);

const Grid = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  border-bottom: 2px solid #eee;
  padding: 1em;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    grid-template-columns: ${(props) =>
      `repeat(auto-fill, minmax(calc(${props.width}px - 2em), 1fr))`};
    padding-left: 0;
    padding-right: 0;
  }
`;

const CustomAvatar = styled(Avatar)`
  height: 128px;
  width: 128px;
  background-color: ${(props) => props.theme.color.green} !important;
  margin-bottom: 0.75rem;
`;
