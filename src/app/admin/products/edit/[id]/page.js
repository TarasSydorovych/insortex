// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useRouter, useParams } from "next/navigation";
// import styles from "../../../../components/admin/styles/addStyle.module.css";
// import Swal from "sweetalert2";
// import BackMenu from "@/app/components/admin/backMenu";
// import { storage } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

// export default function EditProductPage() {
//   const { id } = useParams();
//   const router = useRouter();
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
//   const [imageUrls, setImageUrls] = useState([]);
//   console.log("id", id);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`/api/products`);
//         const productData = response.data;

//         // Знаходимо товар за ідентифікатором id
//         const selectedProduct = productData.find(
//           (product) => product._id === id
//         );

//         if (selectedProduct) {
//           setFormState(selectedProduct);
//           setImageUrls(selectedProduct.images || []);
//         } else {
//           console.error("Товар з таким ID не знайдено");
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/category");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchProduct();
//     fetchCategories();
//   }, [id]);

//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const uploadedUrls = [];

//     for (const file of files) {
//       const imageRef = ref(storage, `images/${file.name}`);
//       await uploadBytes(imageRef, file);
//       const url = await getDownloadURL(imageRef);
//       uploadedUrls.push(url);
//     }

//     setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
//     setFormState((prevState) => ({
//       ...prevState,
//       images: [...prevState.images, ...uploadedUrls],
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

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const isNameValid = Object.values(formState.name).every(
//   //     (value) => value.trim() !== ""
//   //   );
//   //   if (!isNameValid) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Помилка!",
//   //       text: "Будь ласка, заповніть усі назви для кожної мови.",
//   //     });
//   //     return;
//   //   }

//   //   Swal.fire({
//   //     title: "Оновлення продукту...",
//   //     allowOutsideClick: false,
//   //     didOpen: () => {
//   //       Swal.showLoading();
//   //     },
//   //   });

//   //   try {
//   //     const data = {
//   //       name: formState.name,
//   //       shortDescription: formState.shortDescription,
//   //       longDescription: formState.longDescription,
//   //       seotitle: formState.seotitle,
//   //       seodescriptions: formState.seodescriptions,
//   //       videoUrl: formState.videoUrl,
//   //       category: formState.category,
//   //       images: imageUrls,
//   //       characteristics: formState.characteristics,
//   //     };

//   //     if (formState.model3dFile) {
//   //       const formData = new FormData();
//   //       formData.append("file", formState.model3dFile);
//   //       formData.append("fileName", formState.model3dFile.name);

//   //       const response = await axios.post("/api/downloadModel", formData, {
//   //         headers: { "Content-Type": "multipart/form-data" },
//   //       });

//   //       if (response.data.path) {
//   //         data.model3dFile = response.data.path;
//   //       } else {
//   //         throw new Error("3D модель не була завантажена");
//   //       }
//   //     }

//   //     await axios.put(`/api/products/${id}`, data);

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Продукт оновлено!",
//   //       text: "Продукт успішно оновлено.",
//   //     });

//   //     router.push("/admin/products");
//   //   } catch (error) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Помилка!",
//   //       text: "Сталася помилка під час оновлення продукту.",
//   //     });
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isNameValid = Object.values(formState.name).every(
//       (value) => value.trim() !== ""
//     );
//     if (!isNameValid) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Будь ласка, заповніть усі назви для кожної мови.",
//       });
//       return;
//     }

//     Swal.fire({
//       title: "Оновлення продукту...",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       // Формуємо дані для збереження товару
//       const data = {
//         name: formState.name,
//         shortDescription: formState.shortDescription,
//         longDescription: formState.longDescription,
//         seotitle: formState.seotitle,
//         seodescriptions: formState.seodescriptions,
//         videoUrl: formState.videoUrl,
//         category: formState.category,
//         images: formState.images, // Використовуємо оновлений масив зображень
//         characteristics: formState.characteristics,
//         model3dFile: formState.model3dFile, // Додаємо модель, якщо вона є
//       };

//       // Перевірка, чи файл 3D моделі був змінений
//       if (formState.model3dFile instanceof File) {
//         const formData = new FormData();
//         formData.append("file", formState.model3dFile);
//         formData.append("fileName", formState.model3dFile.name);

//         const response = await axios.post("/api/downloadModel", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         if (response.data.path) {
//           data.model3dFile = response.data.path;
//         } else {
//           throw new Error("3D модель не була завантажена");
//         }
//       }

//       await axios.put(`/api/products?id=${id}`, data);

//       Swal.fire({
//         icon: "success",
//         title: "Продукт оновлено!",
//         text: "Продукт успішно оновлено.",
//       });

//       router.push("/admin/products");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Помилка!",
//         text: "Сталася помилка під час оновлення продукту.",
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
//         <h1 className={styles.enterH1}>Редагувати продукт</h1>
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
//                 {formState.images.map((url, index) => (
//                   <li key={index} className={styles.imageItem}>
//                     <img
//                       src={url}
//                       alt={`Зображення ${index + 1}`}
//                       width={100}
//                     />
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
//             Оновити продукт
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../../components/admin/styles/addStyle.module.css";
import Swal from "sweetalert2";
import BackMenu from "../../../../components/admin/backMenu";
import { storage } from "../../../../../lib/firebase";
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

const languages = ["ua", "en", "ru", "pl"];
const translatedFields = ["name", "shortDescription", "longDescription", "seotitle", "seodescriptions"];
const otherFields = ["images", "characteristics", "videoUrl", "model3dFile", "category"];

function productChanges(original, draft) {
  const changes = {};
  for (const field of translatedFields) {
    const translations = languages
      .filter(lang => (draft[field]?.[lang] ?? "") !== (original[field]?.[lang] ?? ""))
      .map(lang => [lang, draft[field][lang]]);
    if (translations.length) changes[field] = Object.fromEntries(translations);
  }
  for (const field of otherFields) {
    if (draft[field] !== original[field]) changes[field] = draft[field];
  }
  return changes;
}

async function uploadImage(file) {
  const imageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const originalProduct = useRef(null);
  const [formState, setFormState] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const busy = uploading || saving;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoadError(null);
    Promise.all([axios.get("/api/products", { signal }), axios.get("/api/category", { signal })])
      .then(([productsResponse, categoriesResponse]) => {
        if (signal.aborted) return;
        const product = productsResponse.data.find(item => item._id === id);
        if (!product) {
          setLoadError("Товар не знайдено.");
          return;
        }
        const loaded = {
          ...product,
          images: product.images ?? [],
          characteristics: product.characteristics ?? [],
          category: product.category?._id ?? product.category ?? "",
        };
        originalProduct.current = loaded;
        setCategories(categoriesResponse.data);
        setFormState(loaded);
      })
      .catch(() => {
        if (!signal.aborted) setLoadError("Не вдалося завантажити товар. Спробуйте оновити сторінку.");
      });
    return () => controller.abort();
  }, [id]);

  const updateTranslation = (field, lang, value) => {
    setFormState(current => ({ ...current, [field]: { ...current[field], [lang]: value } }));
  };

  const uploadImages = async (files, replaceIndex) => {
    setUploading(true);
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadImage(file));
      setFormState(current => {
        if (current?._id !== id) return current;
        const images = replaceIndex === undefined
          ? [...current.images, ...urls]
          : current.images.map((image, index) => index === replaceIndex ? urls[0] : image);
        return { ...current, images };
      });
    } catch {
      Swal.fire({ icon: "error", title: "Не вдалося завантажити зображення." });
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    e.target.value = "";
    if (files.length) await uploadImages(files);
  };

  const handle3DModelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState(current => ({ ...current, model3dFile: file }));
    }
  };

  const removeImage = (index) => {
    setFormState(current => ({ ...current, images: current.images.filter((_, i) => i !== index) }));
  };

  const remove3DModel = () => {
    setFormState(current => ({ ...current, model3dFile: null }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const isNameValid = Object.values(formState.name).every(
  //     (value) => value.trim() !== ""
  //   );
  //   if (!isNameValid) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Помилка!",
  //       text: "Будь ласка, заповніть усі назви для кожної мови.",
  //     });
  //     return;
  //   }

  //   Swal.fire({
  //     title: "Оновлення продукту...",
  //     allowOutsideClick: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const data = {
  //       name: formState.name,
  //       shortDescription: formState.shortDescription,
  //       longDescription: formState.longDescription,
  //       seotitle: formState.seotitle,
  //       seodescriptions: formState.seodescriptions,
  //       videoUrl: formState.videoUrl,
  //       category: formState.category,
  //       images: imageUrls,
  //       characteristics: formState.characteristics,
  //     };

  //     if (formState.model3dFile) {
  //       const formData = new FormData();
  //       formData.append("file", formState.model3dFile);
  //       formData.append("fileName", formState.model3dFile.name);

  //       const response = await axios.post("/api/downloadModel", formData, {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       });

  //       if (response.data.path) {
  //         data.model3dFile = response.data.path;
  //       } else {
  //         throw new Error("3D модель не була завантажена");
  //       }
  //     }

  //     await axios.put(`/api/products/${id}`, data);

  //     Swal.fire({
  //       icon: "success",
  //       title: "Продукт оновлено!",
  //       text: "Продукт успішно оновлено.",
  //     });

  //     router.push("/admin/products");
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Помилка!",
  //       text: "Сталася помилка під час оновлення продукту.",
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy || formState?._id !== id) return;

    const isNameValid = languages.every(lang => formState.name?.[lang]?.trim());
    if (!isNameValid) {
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Будь ласка, заповніть усі назви для кожної мови.",
      });
      return;
    }

    const data = productChanges(originalProduct.current, formState);
    if (Object.keys(data).length === 0) {
      router.push("/admin/products");
      return;
    }
    setSaving(true);
    Swal.fire({
      title: "Оновлення продукту...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (data.model3dFile instanceof File) {
        const formData = new FormData();
        formData.append("file", data.model3dFile);
        formData.append("fileName", data.model3dFile.name);

        const response = await axios.post("/api/downloadModel", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.path) {
          data.model3dFile = response.data.path;
          setFormState(current => ({ ...current, model3dFile: data.model3dFile }));
        } else {
          throw new Error("3D модель не була завантажена");
        }
      }

      await axios.put(`/api/products?id=${id}`, data);

      Swal.fire({
        icon: "success",
        title: "Продукт оновлено!",
        text: "Продукт успішно оновлено.",
      });

      router.push("/admin/products");
    } catch {
      setSaving(false);
      Swal.fire({
        icon: "error",
        title: "Помилка!",
        text: "Сталася помилка під час оновлення продукту.",
      });
    }
  };

  const handleCharacteristicChange = (index, lang, value) => {
    setFormState(current => ({
      ...current,
      characteristics: current.characteristics.map((characteristic, i) => (
        i === index ? { ...characteristic, title: { ...characteristic.title, [lang]: value } } : characteristic
      )),
    }));
  };

  const addCharacteristic = () => {
    setFormState(current => ({
      ...current,
      characteristics: [
        ...current.characteristics,
        { title: { ua: "", en: "", ru: "", pl: "" } },
      ],
    }));
  };

  const removeCharacteristic = (index) => {
    setFormState(current => ({
      ...current,
      characteristics: current.characteristics.filter((_, i) => i !== index),
    }));
  };
  const handleReplaceImage = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) void uploadImages([file], index);
    }, { once: true });
    fileInput.click();
  };

  return (
    <div className={styles.wrapAllAdmin}>
      <BackMenu />
      <div className={styles.wrapCategoryAdm}>
        <h1 className={styles.enterH1}>Редагувати продукт</h1>
        {loadError ? <p role="alert">{loadError}</p> : formState?._id !== id ? (
          <p role="status">Завантаження товару…</p>
        ) : (
        <form key={id} onSubmit={handleSubmit} className={styles.productForm} aria-busy={busy}>
          {languages.map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Назва продукту ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState.name?.[lang] ?? ""}
                readOnly={saving}
                onChange={(e) => updateTranslation("name", lang, e.target.value)}
                required
              />
            </div>
          ))}

          {languages.map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Короткий опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState.shortDescription?.[lang] ?? ""}
                readOnly={saving}
                onChange={(e) => updateTranslation("shortDescription", lang, e.target.value)}
              />
            </div>
          ))}

          {languages.map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                Довгий опис ({lang.toUpperCase()})
              </label>
              <ReactQuill
                className={styles.productQuill}
                defaultValue={formState.longDescription?.[lang] ?? ""}
                readOnly={saving}
                onChange={(value, _delta, source, editor) => {
                  if (source === "user") {
                    updateTranslation("longDescription", lang, editor.getLength() <= 1 ? "" : value);
                  }
                }}
                modules={modules}
                theme="snow"
              />
            </div>
          ))}

          {languages.map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Title ({lang.toUpperCase()})
              </label>
              <input
                type="text"
                className={styles.productInput}
                value={formState.seotitle?.[lang] ?? ""}
                readOnly={saving}
                onChange={(e) => updateTranslation("seotitle", lang, e.target.value)}
              />
            </div>
          ))}

          {languages.map((lang) => (
            <div key={lang} className={styles.formGroup}>
              <label className={styles.productLabel}>
                SEO Опис ({lang.toUpperCase()})
              </label>
              <textarea
                className={styles.productTextarea}
                value={formState.seodescriptions?.[lang] ?? ""}
                readOnly={saving}
                onChange={(e) => updateTranslation("seodescriptions", lang, e.target.value)}
              />
            </div>
          ))}

          {/* <div className={styles.formGroup}>
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
          </div> */}
          <div className={styles.formGroup}>
            <label className={styles.productLabel}>Зображення продукту</label>
            <input
              type="file"
              multiple
              disabled={busy}
              accept="image/*"
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
                      disabled={busy}
                      onClick={() => removeImage(index)}
                    >
                      Видалити
                    </button>

                    <button
                      type="button"
                      className={styles.removeButton}
                      disabled={busy}
                      onClick={() => handleReplaceImage(index)}
                    >
                      Заміна
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
              disabled={saving}
              className={styles.productFileInput}
              onChange={handle3DModelChange}
            />
            {formState.model3dFile && (
              <div className={styles.modelFile}>
                <span>{formState.model3dFile.name}</span>
                <button
                  type="button"
                  className={styles.removeButton}
                  disabled={saving}
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
              disabled={saving}
              onChange={(e) => {
                const category = e.target.value;
                setFormState(current => ({ ...current, category }));
              }}
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
                {languages.map((lang) => (
                  <div key={lang} className={styles.characteristicInput}>
                    <label>Назва характеристики ({lang.toUpperCase()})</label>
                    <input
                      type="text"
                      className={styles.productInput}
                      value={characteristic.title?.[lang] ?? ""}
                      readOnly={saving}
                      onChange={(e) =>
                        handleCharacteristicChange(index, lang, e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.removeButton}
                  disabled={saving}
                  onClick={() => removeCharacteristic(index)}
                >
                  Видалити характеристику
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              disabled={saving}
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
              value={formState.videoUrl ?? ""}
              readOnly={saving}
              onChange={(e) => {
                const videoUrl = e.target.value;
                setFormState(current => ({ ...current, videoUrl }));
              }}
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={busy}>
            Оновити продукт
          </button>
        </form>
        )}
      </div>
    </div>
  );
}
