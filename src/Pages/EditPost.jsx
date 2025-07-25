import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../Components";
import appwriteService from "../appwrite/Config";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null); 
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log("Fetched post from Appwrite:", post);
                if (post) {
                    setPost(post); 
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
