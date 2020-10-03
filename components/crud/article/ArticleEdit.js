import React, { useEffect, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { getCategories } from "../../../actions/category";
import Loading from "../../spinner/Loading";

const ArticleEdit = (props) => {
  const { addToast } = useToasts();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(true);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedhandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCats();
    let w = props.article.category.map((a) => a._id);
    setCheckedCat(w);
  }, []);

  const getCats = async () => {
    try {
      // console.log('mew here');
      const result = await getCategories();
      setCategories(result.categories);
      // console.log('mre there');
    } catch (error) {
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: false,
      });
      console.log(error);
    }
  };

  const showCategories = () => {
    if (categories) {
      return categories.map((c) => {
        return (
          <li key={c._id} className="list-unstyled text-capitalize">
            <input
              type="checkbox"
              className="mr-2"
              checked={checkedCat.find((a) => a._id === c._id)}
              onChange={() => {
                handleToggleCat(c._id);
              }}
            />
            <label className="form-check-label">{c.name}</label>
          </li>
        );
      });
    }
  };

  const handleToggleCat = (c) => {
    // console.log(c);
    const all = [...checkedCat];
    const checkedIndex = checkedCat.indexOf(c);
    if (checkedIndex === -1) {
      all.push(c);
    } else {
      all.splice(checkedIndex, 1);
    }
    setCheckedCat(all);
  };

  const articleEditArea = () => {
    return (
      <React.Fragment>
        <div className={`px-2`}>
          <div className={`row`}>
            <div className={`col-md-8 col-sm-12`}></div>
            <div className={`col-md-4 col-sm-12`}>
              {categories.length === 0 ? (
                <Loading />
              ) : (
                <div className="form-group">
                  <label htmlFor="title" className="col-form-label">
                    <h4>Blog Categories</h4>
                    <p className="small text-muted">
                      Blog must belong to atleast one of the following
                      categories
                    </p>
                  </label>
                  <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {showCategories()}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return <div className={`container`}>{articleEditArea()}</div>;
};

export default ArticleEdit;
