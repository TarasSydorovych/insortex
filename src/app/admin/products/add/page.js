// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import styles from "../../../components/admin/styles/addStyle.module.css";
// import Swal from "sweetalert2";
// import BackMenu from "@/app/components/admin/backMenu";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const modules = {
//   toolbar: [
//     [{ header: [2, 3, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// export default function AddProductPage() {
//   const [formState, setFormState] = useState({
//     name: { ua: "", en: "", ru: "", pl: "" },
//     shortDescription: { ua: "", en: "", ru: "", pl: "" },
//     longDescription: { ua: "", en: "", ru: "", pl: "" },
//     seotitle: { ua: "", en: "", ru: "", pl: "" },
//     seodescriptions: { ua: "", en: "", ru: "", pl: "" },
//     images: [],
//     characteristics: [{ title: { ua: "", en: "", ru: "", pl: "" } }],
//     videoUrl: "",
//     model3dFile: null,
//     category: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/category");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormState((prevState) => ({
//       ...prevState,
//       images: [...prevState.images, ...files],
//     }));
//   };

//   const handle3DModelChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormState({ ...formState, model3dFile: file });
//     }
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...formState.images];
//     updatedImages.splice(index, 1);
//     setFormState({ ...formState, images: updatedImages });
//   };

//   const remove3DModel = () => {
//     setFormState({ ...formState, model3dFile: null });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Завантаження продукту...",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const formData = new FormData();
//       formData.append("name", JSON.stringify(formState.name));
//       formData.append(
//         "shortDescription",
//         JSON.stringify(formState.shortDescription)
//       );
//       formData.append(
//         "longDescription",
//         JSON.stringify(formState.longDescription)
//       );
//       formData.append("seotitle", JSON.stringify(formState.seotitle));
//       formData.append(
//         "seodescriptions",
//         JSON.stringify(formState.seodescriptions)
//       );
//       formData.append("videoUrl", formState.videoUrl);
//       formData.append("category", formState.category);

//       formState.images.forEach((file) => {
//         formData.append("images", file);
//       });

//       if (formState.model3dFile) {
//         formData.append("model3dFile", formState.model3dFile);
//       }

//       formData.append(
//         "characteristics",
//         JSON.stringify(formState.characteristics)
//       );

//       await axios.post("/api/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const productName = formState.name;

//       await axios.post("/api/updateSitemap", { productName });
//       Swal.fire({
//         icon: "success",
//         title: "Продукт додано!",
//         text: "Новий продукт успішно доданий.",
//       });

//       router.push("/admin/products/list");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка під час додавання продукту.",
//       });
//     }
//   };

//   const handleCharacteristicChange = (index, lang, value) => {
//     const updatedCharacteristics = [...formState.characteristics];
//     updatedCharacteristics[index].title[lang] = value;
//     setFormState({ ...formState, characteristics: updatedCharacteristics });
//   };

//   const addCharacteristic = () => {
//     setFormState({
//       ...formState,
//       characteristics: [
//         ...formState.characteristics,
//         { title: { ua: "", en: "", ru: "", pl: "" } },
//       ],
//     });
//   };

//   const removeCharacteristic = (index) => {
//     const updatedCharacteristics = [...formState.characteristics];
//     updatedCharacteristics.splice(index, 1);
//     setFormState({ ...formState, characteristics: updatedCharacteristics });
//   };

//   return (
//     <div className={styles.wrapAllAdmin}>
//       <BackMenu />
//       <div className={styles.wrapCategoryAdm}>
//         <h1 className={styles.enterH1}>Додати новий продукт</h1>
//         <form onSubmit={handleSubmit} className={styles.productForm}>
//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.productLabel}>
//                 Назва продукту ({lang.toUpperCase()})
//               </label>
//               <input
//                 type="text"
//                 className={styles.productInput}
//                 value={formState.name[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     name: { ...formState.name, [lang]: e.target.value },
//                   })
//                 }
//                 required
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.productLabel}>
//                 Короткий опис ({lang.toUpperCase()})
//               </label>
//               <textarea
//                 className={styles.productTextarea}
//                 value={formState.shortDescription[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     shortDescription: {
//                       ...formState.shortDescription,
//                       [lang]: e.target.value,
//                     },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.productLabel}>
//                 Довгий опис ({lang.toUpperCase()})
//               </label>
//               <ReactQuill
//                 className={styles.productQuill}
//                 value={formState.longDescription[lang]}
//                 onChange={(value) =>
//                   setFormState({
//                     ...formState,
//                     longDescription: {
//                       ...formState.longDescription,
//                       [lang]: value,
//                     },
//                   })
//                 }
//                 modules={modules}
//                 theme="snow"
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.productLabel}>
//                 SEO Title ({lang.toUpperCase()})
//               </label>
//               <input
//                 type="text"
//                 className={styles.productInput}
//                 value={formState.seotitle[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     seotitle: { ...formState.seotitle, [lang]: e.target.value },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           {["ua", "en", "ru", "pl"].map((lang) => (
//             <div key={lang} className={styles.formGroup}>
//               <label className={styles.productLabel}>
//                 SEO Опис ({lang.toUpperCase()})
//               </label>
//               <textarea
//                 className={styles.productTextarea}
//                 value={formState.seodescriptions[lang]}
//                 onChange={(e) =>
//                   setFormState({
//                     ...formState,
//                     seodescriptions: {
//                       ...formState.seodescriptions,
//                       [lang]: e.target.value,
//                     },
//                   })
//                 }
//               />
//             </div>
//           ))}

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Зображення продукту</label>
//             <input
//               type="file"
//               multiple
//               className={styles.productFileInput}
//               onChange={handleImageChange}
//             />
//             {formState.images.length > 0 && (
//               <ul className={styles.imagesList}>
//                 {formState.images.map((image, index) => (
//                   <li key={index} className={styles.imageItem}>
//                     {image.name || image}
//                     <button
//                       type="button"
//                       className={styles.removeButton}
//                       onClick={() => removeImage(index)}
//                     >
//                       Видалити
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Файл 3D моделі</label>
//             <input
//               type="file"
//               className={styles.productFileInput}
//               onChange={handle3DModelChange}
//             />
//             {formState.model3dFile && (
//               <div className={styles.modelFile}>
//                 <span>{formState.model3dFile.name}</span>
//                 <button
//                   type="button"
//                   className={styles.removeButton}
//                   onClick={remove3DModel}
//                 >
//                   Видалити файл
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Категорія</label>
//             <select
//               className={styles.productSelect}
//               value={formState.category}
//               onChange={(e) =>
//                 setFormState({ ...formState, category: e.target.value })
//               }
//               required
//             >
//               <option value="">Оберіть категорію</option>
//               {categories.map((category) => (
//                 <option key={category._id} value={category._id}>
//                   {category.name.ua}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>Характеристики</label>
//             {formState.characteristics.map((characteristic, index) => (
//               <div key={index} className={styles.characteristicRow}>
//                 {["ua", "en", "ru", "pl"].map((lang) => (
//                   <div key={lang} className={styles.characteristicInput}>
//                     <label>Назва характеристики ({lang.toUpperCase()})</label>
//                     <input
//                       type="text"
//                       className={styles.productInput}
//                       value={characteristic.title[lang]}
//                       onChange={(e) =>
//                         handleCharacteristicChange(index, lang, e.target.value)
//                       }
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   className={styles.removeButton}
//                   onClick={() => removeCharacteristic(index)}
//                 >
//                   Видалити характеристику
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className={styles.addButton}
//               onClick={addCharacteristic}
//             >
//               Додати характеристику
//             </button>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.productLabel}>
//               Посилання на YouTube відео
//             </label>
//             <input
//               type="text"
//               className={styles.productInput}
//               value={formState.videoUrl}
//               onChange={(e) =>
//                 setFormState({ ...formState, videoUrl: e.target.value })
//               }
//             />
//           </div>

//           <button type="submit" className={styles.submitButton}>
//             Додати продукт
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import styles from "../../../components/admin/styles/addStyle.module.css";
import Swal from "sweetalert2";
import BackMenu from "@/app/components/admin/backMenu";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export default function AddProductPage() {
  const [formState, setFormState] = useState({
    name: { ua: "", en: "", ru: "", pl: "" },
    shortDescription: { ua: "", en: "", ru: "", pl: "" },
    longDescription: { ua: "", en: "", ru: "", pl: "" },
    seotitle: { ua: "", en: "", ru: "", pl: "" },
    seodescriptions: { ua: "", en: "", ru: "", pl: "" },
    images: [],
    characteristics: [{ title: { ua: "", en: "", ru: "", pl: "" } }],
    videoUrl: "",
    model3dFile: null,
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      uploadedUrls.push(url);
    }

    setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...uploadedUrls],
    }));
  };

  const handle3DModelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({ ...formState, model3dFile: file });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formState.images];
    updatedImages.splice(index, 1);
    setFormState({ ...formState, images: updatedImages });
  };

  const remove3DModel = () => {
    setFormState({ ...formState, model3dFile: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = Object.values(formState.name).every(
      (value) => value.trim() !== ""
    );
    if (!isNameValid) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Будь ласка, заповніть усі назви для кожної мови.",
      });
      return;
    }

    Swal.fire({
      title: "Завантаження продукту...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const data = {
        name: formState.name,
        shortDescription: formState.shortDescription,
        longDescription: formState.longDescription,
        seotitle: formState.seotitle,
        seodescriptions: formState.seodescriptions,
        videoUrl: formState.videoUrl,
        category: formState.category,
        images: imageUrls,
        characteristics: formState.characteristics,
      };

      // Завантаження 3D моделі
      // if (formState.model3dFile) {
      //   console.log("formState.model3dFile", formState.model3dFile);

      //   const formData = new FormData();
      //   formData.append("fileName", formState.model3dFile.name);
      //   formData.append("modelUrl", URL.createObjectURL(formState.model3dFile));

      //   const response = await axios.post("/api/downloadModel", formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });

      //   if (response.data.path) {
      //     data.model3dFile = response.data.path; // Шлях до файлу
      //   } else {
      //     throw new Error("3D модель не була завантажена");
      //   }
      // }
      if (formState.model3dFile) {
        console.log("formState.model3dFile", formState.model3dFile);

        const formData = new FormData();
        formData.append("file", formState.model3dFile); // Додаємо файл під ключем "file"
        formData.append("fileName", formState.model3dFile.name); // Додаємо ім'я файлу

        try {
          const response = await axios.post("/api/downloadModel", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          if (response.data.path) {
            data.model3dFile = response.data.path; // Зберігаємо шлях до файлу
          } else {
            throw new Error("3D модель не була завантажена");
          }
        } catch (error) {
          console.error(
            "Помилка під час завантаження 3D моделі:",
            error.message
          );
        }
      }

      await axios.post("/api/products", data);
      const productName = formState.name;

      await axios.post("/api/updateSitemap", { productName });
      Swal.fire({
        icon: "success",
        title: "Продукт додано!",
        text: "Новий продукт успішно доданий.",
      });

      router.push("/admin/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час додавання продукту.",
      });
    }
  };

  const handleCharacteristicChange = (index, lang, value) => {
    const updatedCharacteristics = [...formState.characteristics];
    updatedCharacteristics[index].title[lang] = value;
    setFormState({ ...formState, characteristics: updatedCharacteristics });
  };

  const addCharacteristic = () => {
    setFormState({
      ...formState,
      characteristics: [
        ...formState.characteristics,
        { title: { ua: "", en: "", ru: "", pl: "" } },
      ],
    });
  };

  const removeCharacteristic = (index) => {
    const updatedCharacteristics = [...formState.characteristics];
    updatedCharacteristics.splice(index, 1);
    setFormState({ ...formState, characteristics: updatedCharacteristics });
  };

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1 className={styles.enterH1}>Додати новий продукт</h1>
        <form onSubmit={handleSubmit} className={styles.productForm}>
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Назва продукту ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState.name[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: { ...formState.name, [lang]: e.target.value },
                  })
                }
                required
              />
            </div>
          ))}

          {/* Короткий опис */}
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Короткий опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState.shortDescription[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    shortDescription: {
                      ...formState.shortDescription,
                      [lang]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}

          {/* Довгий опис */}
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Довгий опис ({lang.toUpperCase()})
              </label>
              <ReactQuill
                className={styles.productQuill}
                value={formState.longDescription[lang]}
                onChange={(value) =>
                  setFormState({
                    ...formState,
                    longDescription: {
                      ...formState.longDescription,
                      [lang]: value,
                    },
                  })
                }
                modules={modules}
                theme="snow"
              />
            </div>
          ))}

          {/* SEO Title */}
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Title ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState.seotitle[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    seotitle: { ...formState.seotitle, [lang]: e.target.value },
                  })
                }
              />
            </div>
          ))}

          {/* SEO Description */}
          {["ua", "en", "ru", "pl"].map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState.seodescriptions[lang]}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    seodescriptions: {
                      ...formState.seodescriptions,
                      [lang]: e.target.value,
                    },
                  })
                }
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Зображення продукту</label>
            <input
              type="file"
              multiple
              className={styles.productFileInput}
              onChange={handleImageChange}
            />
            {formState.images.length > 0 && (
              <ul className={styles.imagesList}>
                {formState.images.map((url, index) => (
                  <li key={index} className={styles.imageItem}>
                    <img
                      src={url}
                      alt={`Зображення ${index + 1}`}
                      width={100}
                    />
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeImage(index)}
                    >
                      Видалити
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Файл 3D моделі</label>
            <input
              type="file"
              className={styles.productFileInput}
              onChange={handle3DModelChange}
            />
            {formState.model3dFile && (
              <div className={styles.modelFile}>
                <span>{formState.model3dFile.name}</span>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={remove3DModel}
                >
                  Видалити файл
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Категорія</label>
            <select
              className={styles.productSelect}
              value={formState.category}
              onChange={(e) =>
                setFormState({ ...formState, category: e.target.value })
              }
              required
            >
              <option value="">Оберіть категорію</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name.ua}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Характеристики</label>
            {formState.characteristics.map((characteristic, index) => (
              <div key={index} className={styles.characteristicRow}>
                {["ua", "en", "ru", "pl"].map((lang) => (
                  <div key={lang} className={styles.characteristicInput}>
                    <label>Назва характеристики ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      className={styles.productInput}
                      value={characteristic.title[lang]}
                      onChange={(e) =>
                        handleCharacteristicChange(index, lang, e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeCharacteristic(index)}
                >
                  Видалити характеристику
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={addCharacteristic}
            >
              Додати характеристику
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.productLabel}>
              Посилання на YouTube відео
            </label>
            <input
              type="text"
              className={styles.productInput}
              value={formState.videoUrl}
              onChange={(e) =>
                setFormState({ ...formState, videoUrl: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Додати продукт
          </button>
        </form>
      </div>
    </div>
  );
}
