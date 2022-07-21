import { Box, Button, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { uniqBy } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { orderBy } from "lodash";
import AsyncSelect from "react-select/async";
import styled from "styled-components";
import { useActions, useStore } from "../../configureStore";
import citiesJson from "../../json/portugal_cities.json";
import districtJson from "../../json/portugal_district.json";
import { theme } from "../../theme";
import LanguageContext from "../../providers/languageProvider";

const HomeFormSearch = () => {
  const history = useHistory();
  const list = useStore((state) => state.categories.categories);
  const { lang } = useContext(LanguageContext);

  const _categories = list.filter(
    (c) =>
      list.filter((p) => p.parent_id > 0 && p.parent_id === c.id).length === 0
  );
  const categories = orderBy(
    _categories,
    [(item) => item.name.toLowerCase()],
    ["asc"]
  );
  const loading = useStore((state) => state.categories.isLoading);
  const getAll = useActions((action) => action.categories.getAll);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAll(lang?.code);
  }, [lang]);

  const contries = [
    {
      value: "portugal",
      label: "Portugal",
    },
  ];

  const validate = (values) => {
    const err = {};

    const message = lang?.tooltips?.requiredField;

    if (values.categories?.length === 0) err.categories = message;
    // if (!values.country) err.country = message;

    return err;
  };

  const formik = useFormik({
    initialValues: {
      categories: [],
      state: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const params = `/profissionais?categories=${formik.values.categories.join(
        ","
      )}&country=${formik.values.country}&state=${formik.values.state}`;
      history.push(params);

      setSubmitting(false);
      formik.resetForm();
    },
    validate,
  });

  const getContextsForSelectCategory = async (input) => {
    const result = categories.filter((item) =>
      item?.name?.toLowerCase()?.includes(input.toLowerCase())
    );
    const data = result?.map((item) => {
      return { label: item.name, value: item.id };
    });

    return uniqBy(data, "label");
  };
  return (
    <FormSearch onSubmit={formik.handleSubmit} noValidate>
      <section class="search">
        <div class="container">
          <div class="row state">
            <p>SELECT THE SERVICES IN YOUR LOCATION!</p>
            <div class="search-frm">
              <div class="need">
                <label for="What do you need?">What do you need?</label>
                <br />
                {!loading && categories?.length > 0 && (
                  <MySelect
                    name="categories"
                    placeholder={lang?.homeFormSearch?.placeholder1}
                    styles={{
                      singleValue: (base) => ({
                        ...base,
                        padding: 5,
                        borderRadius: 5,
                        background: "gray",
                        color: "white",
                        display: "flex",
                      }),
                      control: (base) => ({
                        ...base,
                        height: "54px",
                        "min-height": "34px",
                        "border-radius":"30px",
                      }),
                      menuList: (base) => ({
                        ...base,
                        minHeight: "fit-content",
                      }),
                    }}
                    isMulti
                    onChange={(e) => {
                      if (e) {
                        const result = e.map((item) => item.value);
                        formik.setFieldValue("categories", result);
                      }
                    }}
                    loadOptions={(e) => getContextsForSelectCategory(e)}
                    cacheOptions
                    defaultOptions
                  />
                )}
                <MessageError>
                  {formik.errors.categories &&
                    formik.touched.categories &&
                    formik.errors.categories}
                </MessageError>
              </div>

              <div class="activity">
                <label for="Which State?">Which State?</label>
                <br />
                {!loading && (
                  <Select
                    placeholder={lang?.homeFormSearch?.placeholder3}
                    isDisabled={districtJson?.length === 0}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "54px",
                        "min-height": "34px",
                        "border-radius":"30px"
                      }),
                      menuList: (base) => ({
                        ...base,
                        minHeight: "fit-content",
                      }),
                    }}
                    onChange={(e) => {
                      formik.setFieldValue("state", e.label);
                    }}
                    options={districtJson}
                  />
                )}
              </div>
              <Button className="srch-btn" borderRadius={".2rem"} type="submit">
                {lang?.homeFormSearch?.button}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </FormSearch>
  );
};

export default HomeFormSearch;


const FormSearch = styled.form`
  background-color: ${(props) => props.theme.color.white};
`;
const MySelect = styled(AsyncSelect)``;

const MessageError = styled(Box)`
  color: ${(props) => props.theme.color.red};
`;
