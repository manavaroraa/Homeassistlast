import { Box, Button, Checkbox, Select } from "@chakra-ui/react";
import { Icon, Checkbox as EverCheckbox } from "evergreen-ui";
import { useFormik } from "formik";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWIndowSize";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import MyRadio from "./MyRadio";
import languages from "../../utils/languages";
import { theme } from "../../theme";
import { remove } from "lodash";
import { CloseIcon } from "@chakra-ui/icons";
import { useActions, useStore } from "../../configureStore";
import LanguageContext from "../../providers/languageProvider";

const AdditionalInformations = (props) => {
  const { width } = useWindowSize();
  const {
    values,
    nextStep,
    previousStep,
    save,
    payloader,
    typeRegister,
    edit,
    _formik,
  } = props;

  const [termsPolicy, setTermsPolicy] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const setIsSuccess = useActions((action) => action.auth.setIsSuccess);
  const isSuccess = useStore((state) => state.auth.isSuccess);
  const isAuth = useStore((state) => state.auth.isAuthenticated);

  const _type = values?.user_info?.type || typeRegister;

  let formik = useFormik({
    initialValues: {
      type: _type,
      type_work: values?.user_info?.type_work || _type === 2,
      type_user: values?.user_info?.type_user || _type === 1,
      type_home_assistent:
        values?.user_info?.type_home_assistent || _type === 3,
      has_social_link:
        values?.user_info?.has_social_link?.toString() || "false",
      can_share_social_link:
        values?.user_info?.can_share_social_link?.toString() || "false",
      facebook_link: values?.user_info?.facebook_link || "",
      instagram_link: values?.user_info?.instagram_link || "",
      linkedin_link: values?.user_info?.linkedin_link || "",
      twitter_link: values?.user_info?.twitter_link || "",

      drivers_license: values?.user_info?.car_permission?.toString() || "false",
      living_with_pets:
        values?.user_info?.animal_coexistence?.toString() || "true",
      smoker: values?.user_info?.smoking?.toString() || "false",
      user_language: values?.user_language || [],
      lang:
        values?.user_language?.length > 0
          ? values?.user_language[0]?.language || ""
          : "",
      note: values?.user_info?.note || "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const auth = JSON.parse(localStorage.getItem("4you_auth"));
      const payload = payloader(values);
      await save({ payload, id: auth?.user?.id || 0, step: 5, edit: false });
      setSubmitting(false);
    },
    validate: (values) => {
      const err = {};
      const message = lang?.tooltips?.requiredField;

      return err;
    },
  });
  formik = edit ? _formik : formik;

  let userLang = [...formik.values.user_language];

  const { lang } = useContext(LanguageContext);

  return (
    <MyForm onSubmit={formik.handleSubmit} autocomplete="off">
      <Grid width={width}>
        <MyRadio
          myLabel={lang?.accountProfile?.aditionalInfo?.hasSocialMedia}
          infoMessage={lang?.tooltips?.socialMedia}
          name="has_social_link"
          value={formik.values.has_social_link}
          options={[
            { label: lang?.accountIndex?.hideProfile?.labelYes, value: "true" },
            { label: lang?.accountIndex?.hideProfile?.labelNo, value: "false" },
          ]}
          onChange={(event) =>
            formik.setFieldValue("has_social_link", event.target.value)
          }
        />
        {formik.values.has_social_link === "true" && (
          <MyRadio
            myLabel={lang?.accountProfile?.aditionalInfo?.acceptDisclosure}
            name="can_share_social_link"
            value={formik.values.can_share_social_link}
            options={[
              {
                label: lang?.accountIndex?.hideProfile?.labelYes,
                value: "true",
              },
              {
                label: lang?.accountIndex?.hideProfile?.labelNo,
                value: "false",
              },
            ]}
            onChange={(event) =>
              formik.setFieldValue("can_share_social_link", event.target.value)
            }
          />
        )}
        {formik.values.has_social_link === "true" &&
          formik.values.can_share_social_link === "true" && (
            <>
              <MyInput
                label="link facebook"
                placeholderTemplate={lang?.accountProfile?.placeholder}
                name="facebook_link"
                value={formik.values.facebook_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <MyInput
                label="link instagram"
                placeholderTemplate={lang?.accountProfile?.placeholder}
                name="instagram_link"
                value={formik.values.instagram_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <MyInput
                label="link linkedin"
                placeholderTemplate={lang?.accountProfile?.placeholder}
                name="linkedin_link"
                value={formik.values.linkedin_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <MyInput
                label="link twitter"
                placeholderTemplate={lang?.accountProfile?.placeholder}
                name="twitter_link"
                value={formik.values.twitter_link}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </>
          )}
      </Grid>
      <Grid width={width}>
        <MyRadio
          myLabel={lang?.accountProfile?.aditionalInfo?.driverLicense}
          infoMessage={lang?.tooltips?.driver}
          value={formik.values.drivers_license}
          options={[
            { label: lang?.accountIndex?.hideProfile?.labelYes, value: "true" },
            { label: lang?.accountIndex?.hideProfile?.labelNo, value: "false" },
          ]}
          name="drivers_license"
          onChange={(event) =>
            formik.setFieldValue("drivers_license", event.target.value)
          }
        />
        <MyRadio
          labelForced={lang?.accountProfile?.aditionalInfo?.livingPets}
          infoMessage={lang?.tooltips?.pets}
          name="living_with_pets"
          value={formik.values.living_with_pets}
          options={[
            { label: lang?.accountIndex?.hideProfile?.labelYes, value: "true" },
            { label: lang?.accountIndex?.hideProfile?.labelNo, value: "false" },
          ]}
          onChange={(event) =>
            formik.setFieldValue("living_with_pets", event.target.value)
          }
        />
        <MyRadio
          myLabel={lang?.accountProfile?.aditionalInfo?.smoker}
          infoMessage={lang?.tooltips?.smoker}
          name="smoker"
          value={formik.values.smoker}
          options={[
            { label: lang?.accountIndex?.hideProfile?.labelYes, value: "true" },
            { label: lang?.accountIndex?.hideProfile?.labelNo, value: "false" },
          ]}
          onChange={(event) =>
            formik.setFieldValue("smoker", event.target.value)
          }
        />
      </Grid>
      <Grid width={width}>
        <Box>
          <Box display="flex" alignItems="flex-end">
            <CustomSelect
              widthBox="100%"
              isInvalid={
                !!formik.errors.lang &&
                formik.touched.lang &&
                !!formik.errors.lang
              }
              err={
                formik.errors.lang && formik.touched.lang && formik.errors.lang
              }
              label="Idiomas"
              placeholder={lang?.tooltips?.language}
              onChange={(e) => formik.setFieldValue("lang", e.target.value)}
            >
              {languages?.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </CustomSelect>
            <Button
              as="div"
              type="any"
              onClick={() => {
                if (
                  formik.values.lang?.length > 0 &&
                  !!userLang.find(
                    (item) => item.language === formik.values.lang
                  ) === false
                ) {
                  userLang.push({
                    language: formik.values.lang,
                    read: false,
                    write: false,
                    listening: false,
                  });
                  formik.setFieldValue("user_language", userLang);
                }
              }}
              height="48px"
              cursor="pointer"
              style={{
                backgroundColor: theme.color.white,
                border: `2px solid ${theme.color.green}`,
                color: theme.color.green,
                fontSize: ".8rem",
              }}
            >
              {lang?.accountProfile?.aditionalInfo?.buttonAdd}
            </Button>
          </Box>
          <MessageError>
            {formik.errors.lang && formik.touched.lang && formik.errors.lang}
          </MessageError>
          {userLang?.map((item, idx) => (
            <Box display="flex" alignItems="center" key={idx}>
              <Box>{item?.language}</Box>
              <Box display="flex" alignItems="center">
                <CustomCheckbox
                  isChecked={item.read}
                  onChange={() => {
                    let arr = userLang;
                    arr[idx].read = !arr[idx]?.read;
                    formik.setFieldValue("user_language", arr);
                  }}
                >
                  {lang?.accountProfile?.aditionalInfo?.read}
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={item.write}
                  onChange={(e) => {
                    let arr = userLang;
                    arr[idx].write = !arr[idx]?.write;
                    formik.setFieldValue("user_language", arr);
                  }}
                >
                  {lang?.accountProfile?.aditionalInfo?.speak}
                </CustomCheckbox>
                <CustomCheckbox
                  isChecked={item.listening}
                  onChange={(e) => {
                    let arr = userLang;
                    arr[idx].listening = !arr[idx]?.listening;
                    formik.setFieldValue("user_language", arr);
                  }}
                >
                  {lang?.accountProfile?.aditionalInfo?.understand}
                </CustomCheckbox>
                <DeleteBtn
                  aria-label="remove"
                  name="close"
                  onClick={() => {
                    let arr = userLang;
                    remove(arr, arr[idx]);
                    formik.setFieldValue("user_language", arr);
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid width={width}>
        <MyInput
          area={true}
          row={5}
          name="note"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.note}
          placeholderTemplate={lang?.accountProfile?.placeholder}
          label={lang?.accountProfile?.aditionalInfo?.personalNotes}
          infoMessage={lang?.tooltips?.notes}
        />
      </Grid>
      {!edit && (
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
      <Box padding={"1em"} display={"flex"}>
        {!edit && (
          <MyButton
            type="button"
            click={previousStep}
            className="previous"
            iconBefore={<CustomIcon icon="arrow-left" marginRight="7px" />}
            description={lang?.tooltips?.buttonLabels?.previous}
          />
        )}
        <MyButton
          disabled={
            formik.isSubmitting ||
            (!edit && (!termsAndConditions || !termsPolicy))
          }
          className="next"
          iconAfter={<CustomIcon icon="arrow-right" marginLeft="7px" />}
          description={
            !edit
              ? lang?.tooltips?.buttonLabels?.next
              : lang?.tooltips?.buttonLabels?.edit
          }
        />
      </Box>
    </MyForm>
  );
};

export default AdditionalInformations;

const MyForm = styled.form`
  padding: 2rem 0;
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

const Label = styled.label`
  margin-right: 5px;
  color: ${(props) => props.theme.color.green};
  font-weight: bold;
`;

const MessageError = styled.span`
  transition: 0.2s ease-in-out;
  margin-bottom: 5px;
  margin-left: 5px;
  color: ${(props) => props.theme.color.red};
  font-size: 1em;
`;

const CustomCheckbox = styled(Checkbox)`
  margin-left: 1rem;
  .css-nlndso {
    color: #eee;
  }
  border-color: lightgray;
`;

const DeleteBtn = styled(CloseIcon)`
  border: none !important;
  margin-left: 1rem;
  height: 35px !important;
  cursor: pointer;
  path {
    fill: ${(props) => props.theme.color.red};
  }
`;

const CustomSelect = styled(Select)`
  height: 50px !important;
  border: 2px solid #eee !important;
`;
