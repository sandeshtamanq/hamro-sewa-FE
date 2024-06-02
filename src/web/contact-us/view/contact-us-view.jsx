import { useCallback, useState } from "react";
import Iconify from "../../../components/iconify";
import LoadingButton from "../../../components/loading-button";
import { useCreateContactMutation } from "../../../hooks/useContact";
import { useSnackbar } from "notistack";

export default function ContactUsView() {
  const [messageDetail, setMessageDetail] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = useCallback(() => {
    enqueueSnackbar("Submitted successfully");
    setMessageDetail({
      fullName: "",
      email: "",
      message: "",
    });
  }, [enqueueSnackbar]);

  const onError = useCallback(
    (error) => {
      enqueueSnackbar(
        Array.isArray(error?.response?.data?.message)
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message,
        { variant: "error" }
      );
    },
    [enqueueSnackbar]
  );

  const { mutate: createContact } = useCreateContactMutation(
    onSuccess,
    onError
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setMessageDetail((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createContact(messageDetail);
    },
    [createContact, messageDetail]
  );

  return (
    <main>
      <div className="container-fluid p-4 contactdiv">
        <div className="row">
          <div className="col-md-6">
            <p className="fw-bold fs-2 mt-3">Contact Us</p>
            <p className="mt-2">
              We’re here to help. Fill out the form below and we’ll get back to
              you as soon as possible.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  onChange={handleChange}
                  value={messageDetail.fullName}
                  name="fullName"
                  type="text"
                  className="form-control"
                  id="fullName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={messageDetail.email}
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  onChange={handleChange}
                  value={messageDetail.message}
                  name="message"
                  className="form-control"
                  id="message"
                  rows="4"
                ></textarea>
              </div>
              <LoadingButton
                //   isLoading={isLoading}
                type="submit"
                style="btn btn-primary w-100 mt-3"
              >
                Send Message
              </LoadingButton>
            </form>
          </div>
          <div className="col-md-6">
            <p className="fw-bold fs-4 mt-4">Contact Information</p>
            <div>Reach out to us directly.</div>
            <div className="d-flex align-items-center">
              <Iconify icon="ic:outline-email" />
              <div className="ms-2">Email</div>
            </div>
            <div>Hamrosewa@gmail.com</div>
            <div className="d-flex align-items-center">
              <Iconify icon="ph:phone" />
              <div className="ms-2">Phone</div>
            </div>
            <p>9840580533</p>
            <div className="mt-3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14136.443328399193!2d85.31814686192061!3d27.652042467839227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1763afe90a91%3A0x24e78f10fcea8163!2sSatdobato%2C%20Lalitpur%2044700!5e0!3m2!1sen!2snp!4v1711376737950!5m2!1sen!2snp"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
