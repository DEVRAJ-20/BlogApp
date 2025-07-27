import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/Config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth?.userData);
    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post?.$id) return;
        try {
            setDeleting(true);
            const deleted = await appwriteService.deletePost(post.$id);
            if (deleted) {
                await appwriteService.deleteFile(post.featuredImage);
                setPost(null); // Ensure UI doesn't flash post content
                navigate("/");
            }
        } catch (err) {
            console.error("Delete Error:", err);
        } finally {
            setDeleting(false);
        }
    };

    return post ? (
        <div className="py-10 bg-gradient-to-br from-white via-pink-50 to-indigo-100 min-h-screen">
            <Container>
                <div className="w-full mx-auto max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
                    
                    {/* Feature Image */}
                    <div className="w-full bg-gray-100">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full max-h-[450px] object-contain object-center mx-auto bg-white"
                        />
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                        {/* Title & Buttons */}
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                            {isAuthor && (
                                <div className="flex gap-2">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-500" className="text-sm px-3 py-1 rounded">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        bgColor="bg-red-500"
                                        className="text-sm px-3 py-1 rounded"
                                        onClick={deletePost}
                                        disabled={deleting}
                                    >
                                        {deleting ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Post Content HTML */}
                        <div className="prose prose-lg max-w-none text-gray-700">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
