import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileComponent from "../../components/editProfile";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  getAllProfilesApi,
  updateProfileApi,
} from "../../services/profile.service";

interface EditProfileContainerInterface {}

const EditProfileContainer: React.FC<EditProfileContainerInterface> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [updatedProfile_pic, setUpdatedProfile_pic] = useState<any>("");

  const [file_list, setFile_list] = useState<any | undefined>();

  const [updateProfileErrors, setUpdateProfileErrors] = useState();

  const handleImageChange = (image: any) => {
    setUpdatedProfile_pic(image?.file);
    setFile_list(image?.fileList);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const onFinish = (val?: any) => {
    let subObj = {
      ...val,
      profile_pic: updatedProfile_pic,
      _method: "PUT",
    };

    setSubmitting(true);

    dispatch(
      updateProfileApi({
        data: subObj,

        finalCallback: () => {
          setSubmitting(false);
        },
        successCallback: () => {
          fetchAllProfiles();
          navigate("/");
        },
        failureCallback: (val: any) => {
          setUpdateProfileErrors(val);
        },
      })
    );
  };

  const fetchAllProfiles = () => {
    dispatch(
      getAllProfilesApi({
        finalCallback: () => {},
        data: undefined,
      })
    );
  };

  return (
    <EditProfileComponent
      onFinish={onFinish}
      submitting={submitting}
      handleBackButton={handleBackButton}
      handleImageChange={handleImageChange}
      file_list={file_list}
      updateProfileErrors={updateProfileErrors}
    />
  );
};

export default EditProfileContainer;
