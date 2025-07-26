import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      author: post?.author || "",
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const submit = async (data) => {
    const file = data.image?.[0]
      ? await appwriteService.uploadFile(data.image[0])
      : null;
  
    if (post) {
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
  
      const updated = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });
  
      if (updated) navigate(`/post/${updated.$id}`);
    } else {
      if (!file) return;
  
      const newPostData = {
        ...data,
        featuredImage: file.$id,
        userId: userData?.$id || "",  // ✅ Required by Appwrite
        author: data.author,        // ✅ FIXED HERE
      };
      console.log("Creating post with user ID:", userData?.$id);
  
      const created = await appwriteService.createPost(newPostData);
      if (created) navigate(`/post/${created.$id}`);
    }
  };
  

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col lg:flex-row gap-8"
    >
      {/* Left Side */}
      <div className="flex-1">
        <Input
          label="Author Name"
          placeholder="Enter your name"
          className="mb-4"
          {...register("author", { required: true })}
        />

        <Input
          label="Title"
          placeholder="Enter your post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Post slug (auto-generated)"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-80">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/*"
          {...register("image", { required: !post })}
        />

        {post?.featuredImage && (
          <div className="mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt="Preview"
              className="rounded-xl w-full h-auto shadow"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className={`w-full ${
            post ? "bg-green-500" : "bg-gradient-to-r from-indigo-500 to-fuchsia-500"
          } hover:scale-[1.02] transition-all`}
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}
