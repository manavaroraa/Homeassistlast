import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Rifm } from "rifm";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWIndowSize";
import {
  formatCpf,
  formatDate,
  formatNIF,
  formatPhone,
  formatZip,
} from "../../utils/helper";
import MyInput from "./MyInput";
import MyRadio from "./MyRadio";
import districtJson from "../../json/portugal_district.json";
import MySelect from "./MySelect";
import { Checkbox as EverCheckbox, Icon } from "evergreen-ui";
import MyButton from "./MyButton";
import { formatToDate } from "brazilian-values";
import { useStore } from "../../configureStore";
import { PasswordTest } from "../../utils/helper";
import LanguageContext from "../../providers/languageProvider";

const PessonalIdentification = (props) => {
  const { width } = useWindowSize();
  const { values, typeRegister, save, payloader, edit, _formik } = props;

  const [termsPolicy, setTermsPolicy] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const isAuth = useStore((state) => state.auth.isAuthenticated);

  const _type = values?.user_info?.type || typeRegister;

  let formik = useFormik({
    initialValues: {
      type: _type,
      type_work: values?.user_info?.type_work || _type === 2,
      type_user: values?.user_info?.type_user || _type === 1,
      type_home_assistent:
        values?.user_info?.type_home_assistent || _type === 3,
      id: values?.id || 0,
      name: values?.name || "",
      date_born:
        (values?.birthday?.length > 0 &&
          formatToDate(new Date(values?.birthday))) ||
        "",
      gender: values?.gender || "1",
      cpf: values?.user_info?.cpf || "",
      rg: values?.user_info?.rg || "",
      uf: values?.user_info?.rg_emissor || "",
      zipcode: values?.address?.zipcode || "",
      street: values?.address?.street || "",
      number: values?.address?.number || "",
      complement: values?.address?.complement || "",
      district: values?.address?.district || "",
      city: values?.address?.city || "",
      state: values?.address?.state || "",
      country: values?.address?.country || "",
      phone1: values?.user_info?.phone1 || "",
      email: values?.email || "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const auth = JSON.parse(localStorage.getItem("4you_auth"));
      const payload = payloader(values);
      await save({ payload, id: auth?.user?.id || 0, step: 1, edit: false });
      setSubmitting(false);
    },
    validate: (values) => {
      const err = {};
      const message = lang?.tooltips?.requiredField;
      if (!values.name) err.name = message;

      if (values.cpf && values.cpf.length > 0) {
        if (language !== "pt-br") {
          if (parseInt(values.cpf[0]) > 4 || parseInt(values.cpf[0]) === 0)
            err.cpf = "NIF inválido";
        } else {
          if (parseInt(values.cpf[0]) > 11 || parseInt(values.cpf[0]) === 0)
            err.cpf = "CPF inválido";
        }
      }
      if (!values.cpf) err.cpf = message;
      if (!values.rg) err.rg = message;
      if (!values.uf) err.uf = message;
      if (!values.zipcode) err.zipcode = message;
      if (!values.street) err.street = message;
      if (!values.number) err.number = message;
      if (!values.district) err.district = message;
      if (!values.city) err.city = message;
      if (!values.state) err.state = message;
      if (!values.country) err.country = message;
      if (!values.phone1) err.phone1 = message;
      if (!values.email) err.email = message;
      if (!values.id && !PasswordTest(values.password)) {
        err.password = lang?.tooltips?.errorPassword;
      }

      return err;
    },
  });
  formik = edit ? _formik : formik;

  const { lang, language } = useContext(LanguageContext);

  return (
    <MyForm onSubmit={formik.handleSubmit} autocomplete="off">
      <Grid width={width}>
        <MyInput
          isInvalid={
            !!formik.errors.name && formik.touched.name && !!formik.errors.name
          }
          err={formik.errors.name && formik.touched.name && formik.errors.name}
          label={lang?.accountProfile?.personalInfo?.name}
          name="name"
          placeholderTemplate={lang?.accountProfile?.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          infoMessage={lang?.tooltips?.name}
        />
        <Rifm
          accept={/\d+/g}
          format={formatDate}
          value={formik.values.date_born}
          onChange={(e) => {
            formik.setFieldValue("date_born", e);
            let breakDate = e.split("/");
            if (breakDate && breakDate[1]) {
              if (parseInt(breakDate[0]) > 31) {
                breakDate.splice(0, 1, "31");
                formik.setFieldValue("date_born", breakDate.join("/"));
              }
              if (parseInt(breakDate[1]) > 12) {
                breakDate.splice(1, 1, "12");
                formik.setFieldValue("date_born", breakDate.join("/"));
              }
            }
          }}
        >
          {({ value, onChange }) => (
            <MyInput
              label={lang?.accountProfile?.personalInfo?.birthdate}
              placeholder="ex: 20/01/2000"
              name="date_born"
              value={value}
              onChange={onChange}
              onBlur={formik.handleBlur}
              infoMessage={lang?.tooltips?.date}
            />
          )}
        </Rifm>
        <MyRadio
          myLabel={lang?.accountProfile?.personalInfo?.gender}
          name="gender"
          value={formik.values.gender}
          options={[
            {
              label:
                lang?.accountProfile?.personalInfo?.genderSelection?.female,
              value: "1",
            },
            {
              label: lang?.accountProfile?.personalInfo?.genderSelection?.male,
              value: "2",
            },
            {
              label: lang?.accountProfile?.personalInfo?.genderSelection?.other,
              value: "3",
            },
          ]}
          onChange={(e) => {
            formik.setFieldValue("gender", e.target.value);
          }}
        />
        <Rifm
          accept={/\d+/g}
          format={language !== "pt-br" ? formatNIF : formatCpf}
          value={formik.values.cpf}
          onChange={(e) => {
            formik.setFieldValue("cpf", e);
          }}
        >
          {({ value, onChange }) => (
            <MyInput
              disabled={formik.values.id > 0 ? true : false}
              isInvalid={
                !!formik.errors.cpf && formik.touched.cpf && !!formik.errors.cpf
              }
              err={formik.errors.cpf && formik.touched.cpf && formik.errors.cpf}
              label={lang?.accountProfile?.personalInfo?.nif}
              labelForced={lang?.accountProfile?.personalInfo?.nif}
              placeholderTemplate={lang?.accountProfile?.placeholder}
              name="cpf"
              type="tel"
              value={value}
              onChange={onChange}
              onBlur={formik.handleBlur}
              infoMessage={lang?.tooltips?.cpf}
            />
          )}
        </Rifm>
        <MyInput
          isInvalid={
            !!formik.errors.rg && formik.touched.rg && !!formik.errors.rg
          }
          err={formik.errors.rg && formik.touched.rg && formik.errors.rg}
          disabled={formik.values.id > 0 ? true : false}
          label={lang?.accountProfile?.personalInfo?.documentNumber}
          placeholder="CC, AR ou Passaporte"
          name="rg"
          value={formik.values.rg}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maxlength={20}
          infoMessage={lang?.tooltips?.id}
        />
        <MyInput
          isInvalid={
            !!formik.errors.uf && formik.touched.uf && !!formik.errors.uf
          }
          err={formik.errors.uf && formik.touched.uf && formik.errors.uf}
          disabled={formik.values.id > 0 ? true : false}
          label={lang?.accountProfile?.personalInfo?.issuedBy}
          placeholder={`${lang?.accountProfile?.placeholder} ${lang?.accountProfile?.personalInfo?.issuedBy}`}
          name="uf"
          value={formik.values.uf}
          maxlength={48}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          infoMessage={lang?.tooltips?.uf}
        />
      </Grid>
      <Grid width={width}>
        <Rifm
          accept={/\d+/g}
          format={formatZip}
          value={formik.values.zipcode}
          onChange={(e) => {
            formik.setFieldValue("zipcode", e);
          }}
        >
          {({ value, onChange }) => (
            <MyInput
              isInvalid={
                !!formik.errors.zipcode &&
                formik.touched.zipcode &&
                !!formik.errors.zipcode
              }
              err={
                formik.errors.zipcode &&
                formik.touched.zipcode &&
                formik.errors.zipcode
              }
              type="tel"
              label={lang?.accountProfile?.personalInfo?.postalCode}
              placeholder="ex: 1111-111"
              name="zipcode"
              value={value}
              onChange={onChange}
              onBlur={formik.handleBlur}
              infoMessage={lang?.tooltips?.zipcode}
            />
          )}
        </Rifm>
        <MyInput
          isInvalid={
            !!formik.errors.street &&
            formik.touched.street &&
            !!formik.errors.street
          }
          err={
            formik.errors.street &&
            formik.touched.street &&
            formik.errors.street
          }
          type="text"
          label={lang?.accountProfile?.personalInfo?.street}
          placeholder="ex: av. paulista"
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          infoMessage={lang?.tooltips?.street}
        />
        <MyInput
          isInvalid={
            !!formik.errors.number &&
            formik.touched.number &&
            !!formik.errors.number
          }
          err={
            formik.errors.number &&
            formik.touched.number &&
            formik.errors.number
          }
          label={lang?.accountProfile?.personalInfo?.number}
          placeholder="ex: 600"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          infoMessage={lang?.tooltips?.number}
        />
        <MyInput
          label={lang?.accountProfile?.personalInfo?.complement}
          placeholder="ex: ap 100"
          name="complement"
          value={formik.values.complement}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          infoMessage={lang?.tooltips?.complement}
        />
        <MyInput
          isInvalid={
            !!formik.errors.district &&
            formik.touched.district &&
            !!formik.errors.district
          }
          err={
            formik.errors.district &&
            formik.touched.district &&
            formik.errors.district
          }
          label={lang?.accountProfile?.personalInfo?.freguesia}
          placeholder="ex: jd. america"
          name="district"
          value={formik.values.district}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <MyInput
          isInvalid={
            !!formik.errors.city && formik.touched.city && !!formik.errors.city
          }
          err={formik.errors.city && formik.touched.city && formik.errors.city}
          label={lang?.accountProfile?.personalInfo?.city}
          name="city"
          placeholderTemplate={lang?.accountProfile?.placeholder}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {districtJson?.length > 0 && (
          <MySelect
            err={
              formik.errors.state && formik.touched.state && formik.errors.state
            }
            label={lang?.accountProfile?.personalInfo?.district}
            placeholder="Selecione um distrito..."
            isDisabled={districtJson?.length === 0}
            styles={{
              control: (base) => ({
                ...base,
                height: "50px",
                "min-height": "34px",
              }),
              menuList: (base) => ({
                ...base,
                minHeight: "fit-content",
              }),
            }}
            onChange={(e) => {
              formik.setFieldValue("state", e.label);
            }}
            defaultValue={{
              label: formik.values.state,
              value: formik.values.state,
            }}
            options={districtJson}
            maxlength={20}
          />
        )}
        <MyInput
          isInvalid={
            !!formik.errors.country &&
            formik.touched.country &&
            !!formik.errors.country
          }
          err={
            formik.errors.country &&
            formik.touched.country &&
            formik.errors.country
          }
          label={lang?.accountProfile?.personalInfo?.country}
          placeholderTemplate={lang?.accountProfile?.placeholder}
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid width={width}>
        <Rifm
          accept={/[0-9\)\(\+\-\s]+/g}
          format={formatPhone}
          value={formik.values.phone1}
          onChange={(e) => {
            formik.setFieldValue("phone1", e);
          }}
        >
          {({ value, onChange }) => (
            <MyInput
              isInvalid={
                !!formik.errors.phone1 &&
                formik.touched.phone1 &&
                !!formik.errors.phone1
              }
              err={
                formik.errors.phone1 &&
                formik.touched.phone1 &&
                formik.errors.phone1
              }
              label={lang?.accountProfile?.personalInfo?.telephone}
              placeholder="+351123456"
              name="phone1"
              value={value}
              onChange={onChange}
              onBlur={formik.handleBlur}
              maxlength={20}
              infoMessage={lang?.tooltips?.phone}
            />
          )}
        </Rifm>
        <MyInput
          isInvalid={
            !!formik.errors.email &&
            formik.touched.email &&
            !!formik.errors.email
          }
          err={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
          label="E-mail"
          placeholder="ex: joao@email.com"
          name="email"
          readOnly="readonly"
          onFocus={(event) => {
            event.target.removeAttribute("readonly");
          }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          infoMessage={lang?.tooltips?.email}
        />
        {formik.values.id === 0 && (
          <MyInput
            isInvalid={
              !!formik.errors.password &&
              formik.touched.password &&
              !!formik.errors.password
            }
            err={
              formik.errors.password &&
              formik.touched.password &&
              formik.errors.password
            }
            type="password"
            label={lang?.login?.passwordLogin}
            name="password"
            readOnly="readonly"
            onFocus={(event) => {
              event.target.removeAttribute("readonly");
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            infoMessage={lang?.tooltips?.password}
          />
        )}
      </Grid>
      {!isAuth && (
        <Box padding={"1em"}>
          <EverCheckbox
            label={lang?.accountProfile?.optInTerms}
            checked={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.checked)}
          />
          <EverCheckbox
            label={lang?.accountProfile?.optInPolicy}
            checked={termsPolicy}
            onChange={(e) => setTermsPolicy(e.target.checked)}
          />
          {!termsAndConditions && !termsPolicy && (
            <MessageError>{lang?.accountProfile?.errorTerms}</MessageError>
          )}
        </Box>
      )}

      {(!edit ||
        (edit &&
          formik.values.type_user &&
          !formik.values.type_work &&
          !formik.values.type_home_assistent)) && (
        <Box padding={"1em"} display={"flex"}>
          <MyButton
            disabled={
              formik.isSubmitting ||
              (!isAuth && (!termsAndConditions || !termsPolicy))
            }
            className="next"
            iconAfter={
              formik.values.type_work ||
              (formik.values.type_home_assistent && (
                <CustomIcon icon="arrow-right" marginLeft="7px" />
              ))
            }
            description={
              formik.values.type_user &&
              !formik.values.type_work &&
              !formik.values.type_home_assistent
                ? formik.values.id === 0
                  ? lang?.tooltips?.buttonLabels?.register
                  : lang?.tooltips?.buttonLabels?.edit
                : lang?.tooltips?.buttonLabels?.next
            }
          />
        </Box>
      )}
    </MyForm>
  );
};

export default PessonalIdentification;

const MyForm = styled.form`
  padding: 2em 0;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    padding: 1em 0;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  border-bottom: 2px solid #eee;
  padding: 1em;
  @media (max-width: ${(props) => props.theme.queries.sm}) {
    grid-template-columns: ${(props) =>
      `repeat(auto-fill, minmax(calc(${props.width}px - 2em), 1fr))`};
    padding-left: 0;
    padding-right: 0;
  }
`;

const CustomIcon = styled(Icon)`
  cursor: pointer;
  :hover,
  :focus {
    opacity: 0.8;
  }
`;

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  margin-left: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
`;
