export default function Player({ id }) {
  return (
    <video width="600" controls>
      <source
        src={`http://localhost:5000/api/videos/${id}/stream`}
        type="video/mp4"
      />
    </video>
  );
}
