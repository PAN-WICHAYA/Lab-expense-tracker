module.exports =
  ('*',
  (req, res) => {
    res.status(404).json({ message: 'path not found on this page' });
  });
