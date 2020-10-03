import React, { useEffect, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import Dante from "Dante2";
import { ImageBlockConfig } from "Dante2/package/lib/components/blocks/image.js";
import { VideoBlockConfig } from "Dante2/package/lib/components/blocks/video.js";

import { getCategories } from "../../../actions/category";
import Loading from "../../spinner/Loading";
import styles from "./ArticleEdit.module.css";
import { editParticularArticle } from "../../../actions/article";
import { UPLOADS, COOKIE_NAME } from "../../../appConstants";
import { useRouter } from "next/router";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import { authenticate } from "../../../helpers/auth";

const ArticleEdit = (props) => {
  const { addToast } = useToasts();
  const router = useRouter();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.article.featuredPhoto);
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
  const [body, setBody] = useState(JSON.parse(props.article.body));
  const [extracted, setExtracted] = useState(props.article.mdesc);
  const [categories, setCategories] = useState([]);
  const [checkedCat, setCheckedCat] = useState(
    props.article.category.map((a) => a._id)
  );
  const [loading, setLoading] = useState(false);
  const [tokenDetails, setTokenDetails] = useState(false);

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
    if (!tokenData) {
      return;
    }
    getCats();
    let w = props.article.category.map((a) => a._id);
    setCheckedCat(w);
    setBody(JSON.parse(props.article.body));
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
              checked={findOutCheckedCategory(c._id)}
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

  const findOutCheckedCategory = (c) => {
    const result = checkedCat.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  //   process the first 200 charcters
  const extraction = (data) => {
    let s = "";
    data.blocks.forEach((b) => {
      if (s.length < 200) {
        if (b.type.toLowerCase() !== "image" && b.entityRanges.length === 0) {
          if (s.length + b.text.length >= 200) {
            let diff = 200 - s.length;
            s += b.text.substr(0, diff);
          } else {
            s += b.text + "\n";
          }
        }
      }
    });

    if (s.length < 200) {
      return false;
    } else {
      return s;
    }
  };

  const checkValidation = () => {
    if (!extracted || extracted.length < 200) {
      return "Post must be atleast 200 characters long";
    } else if (checkedCat.length === 0) {
      return "No category selected";
    }
    return false;
  };

  const handleSubmit = async () => {
    let res = checkValidation();
    if (res) {
      addToast(`${res}`, {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }
    let formData = new FormData();
    formData.append("mdesc", extracted);
    formData.append("body", JSON.stringify(body));
    formData.append("categories", checkedCat);
    if (file) {
      formdata.append("image", file);
    } else {
      formData.append("featuredPhoto", props.article.featuredPhoto);
    }

    setLoading(true);

    let response;
    try {
      response = await editParticularArticle(props.article.slug, formData);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      addToast(`${response.message}`, {
        appearance: "success",
        autoDismiss: true,
      });
      router.reload();
    } catch (error) {
      setLoading(false);
      addToast(`${error}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const renderCategoriesArea = () => {
    return (
      <React.Fragment>
        {categories.length === 0 ? (
          <>
            <Loading />
            <br />
          </>
        ) : (
          <div className="form-group">
            <label htmlFor="title" className="col-form-label">
              <h4>Blog Categories</h4>
              <p className="small text-muted">
                Blog must belong to atleast one of the following categories
              </p>
            </label>
            <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
              {showCategories()}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  };

  const articleEditArea = () => {
    return (
      <React.Fragment>
        {loading && <LoadingSpinner asOverlay />}
        <div className={`px-2 my-4`}>
          <div className={`row`}>
            <div className={`col-md-8 col-sm-12`}>
              <h3 className={`text-center`}>{props.article.title}</h3>
              <div>
                <input
                  type="file"
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  accept=".jpg,.pmg,.jpeg"
                  onChange={pickedhandler}
                />
                <div className={`${styles.imageUpload}`}>
                  <div className={`${styles.imageUploadPreview} text-center`}>
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={`mx-auto`}
                      />
                    )}
                    {!previewUrl && <p>Profile picture.</p>}
                  </div>
                  {props.article.postedBy._id ===
                    (tokenDetails && tokenDetails.id) && (
                    <button
                      type="button"
                      className={`btn btn-primary`}
                      onClick={pickImageHandler}
                    >
                      PICK IMAGE
                    </button>
                  )}
                </div>
                {!previewUrl && !isValid && <p>Invalid image type chosen</p>}
              </div>
              <hr />
              <Dante
                content={body}
                read_only={!tokenDetails}
                onChange={(editor) => {
                  setBody(editor.emitSerializedOutput());
                  setExtracted(extraction(editor.emitSerializedOutput()));
                }}
                widgets={[
                  ImageBlockConfig({
                    options: {
                      upload_url: `${UPLOADS}`,
                      upload_callback: (ctx, img) => {
                        alert("file uploaded: " + ctx.data.url);
                      },
                      upload_error_callback: (ctx, img) => {
                        console.log(ctx);
                      },
                    },
                  }),
                  VideoBlockConfig({
                    options: {
                      upload_url: `${UPLOADS}`,
                      upload_callback: (ctx, img) => {
                        console.log("file uploaded: " + ctx.data.url);
                      },
                      upload_error_callback: (ctx, img) => {
                        debugger;
                        console.log(ctx);
                      },
                    },
                  }),
                ]}
              />
            </div>
            <div className={`col-md-4 col-sm-12`}>
              {tokenDetails && renderCategoriesArea()}
              {props.article.postedBy._id ===
                (tokenDetails && tokenDetails.id) && (
                <button
                  onClick={() => handleSubmit()}
                  className={`${styles.customBtn} ${styles.btn1} mt-3`}
                >
                  Edit
                </button>
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
