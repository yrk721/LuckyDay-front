import * as S from "./ReviewLuckyDayPage.styled";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "hooks";
import {
  useGetLuckyDayDetail,
  useCreateLuckyDayReview,
  useUpdateLuckyDayReview,
} from "services";
import {
  SvgButton,
  SingleButtonLayout,
  PageSpinner,
  FileUploader,
} from "components";
import { ShortBoxIcon } from "assets";
import { formatDate } from "utils";
import axios from "axios";

export default function ReviewLuckyDayPage() {
  const { id } = useParams();
  const { addToast } = useToast();

  const { data, isLoading, error } = useGetLuckyDayDetail(id || "");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [review, setReview] = useState<string>("");
  const [reviewError, setReviewError] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isDefaultImage, setIsDefaultImage] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const createReviewMutation = useCreateLuckyDayReview();
  const updateReviewMutation = useUpdateLuckyDayReview();

  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setIsDefaultImage(false);
    setIsButtonDisabled(false);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newReview = e.target.value;
    if (newReview.length > 100) {
      setReviewError("리뷰는 100자 이내로 작성해 주세요.");
    } else {
      setReviewError("");
      setReview(newReview);
      setIsButtonDisabled(newReview === review && !uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!review) {
      addToast({ content: "내용을 입력해 주세요." });
      return;
    }

    const reviewReqDto = {
      dtlNo: id ? Number(id) : 0,
      review,
    };

    let imageToUpload: File | null = uploadedFile;

    if (!uploadedFile && existingImageUrl && !isDefaultImage) {
      // 이미지를 변경하지 않은 경우, 기존 이미지를 다시 서버에 전송하기 위해 Blob 형태로 변환
      const response = await fetch(existingImageUrl);
      const blob = await response.blob();
      imageToUpload = new File([blob], "existingImage.png", {
        type: blob.type,
      });
    }

    const mutationPayload = {
      body: reviewReqDto,
      image: imageToUpload,
    };

    console.log("Final Payload:", mutationPayload);

    const mutationFn = isEditMode
      ? updateReviewMutation.mutate
      : createReviewMutation.mutate;

    mutationFn(mutationPayload, {
      onSuccess: () => {
        addToast({
          content: isEditMode ? "수정되었습니다." : "저장되었습니다.",
        });
        navigate(`/luckydays/review/${id}`);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 2013) {
            addToast({ content: "이미지 또는 내용을 입력해 주세요." });
          } else {
            addToast({
              content: `저장 중 오류가 발생했습니다: ${
                error.response.data.message || error.response.status
              }`,
            });
          }
        } else {
          addToast({ content: "저장 중 오류가 발생했습니다" });
        }
      },
    });
  };

  useEffect(() => {
    if (data && data.resData) {
      if (data.resData.review !== null) {
        setReview(data.resData.review);
        setIsEditMode(true);
      }

      if (data.resData.imageUrl) {
        const fullImageUrl = `${import.meta.env.VITE_BASE_URL}${
          data.resData.imageUrl
        }`;
        setExistingImageUrl(fullImageUrl);
        setIsDefaultImage(data.resData.imageUrl.includes("default"));
      }

      setIsButtonDisabled(true);
    }
  }, [data]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error || !data) {
    return <S.Container>오류가 발생했습니다.</S.Container>;
  }

  const { dday, actNm } = data.resData;

  return (
    <SingleButtonLayout>
      <S.Container>
        <S.TextBox>{formatDate(dday, "YYYY-MM-DD")}</S.TextBox>
        <S.ReviewBox>
          <S.TextBox>{actNm}</S.TextBox>
          <S.ImageUploadBox>
            {existingImageUrl && !isDefaultImage && !uploadedFile ? (
              <S.ImageBox>
                <img src={existingImageUrl} alt="Saved preview" />
              </S.ImageBox>
            ) : (
              uploadedFile && (
                <S.ImageBox>
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Uploaded preview"
                  />
                </S.ImageBox>
              )
            )}
            <FileUploader onFileSelect={handleFileSelect} />
          </S.ImageUploadBox>
          <S.ReviewTextarea
            value={review}
            onChange={handleReviewChange}
            placeholder={"100자 이내로 럭키 데이를 기록해 보세요:)"}
          />
          <S.ErrorContainer>
            {reviewError && <S.ErrorText>{reviewError}</S.ErrorText>}
          </S.ErrorContainer>
        </S.ReviewBox>
        <S.ButtonBox>
          <SvgButton
            label={isEditMode ? "수정하기" : "저장하기"}
            icon={<ShortBoxIcon />}
            width="120px"
            height="50px"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          />
        </S.ButtonBox>
      </S.Container>
    </SingleButtonLayout>
  );
}
