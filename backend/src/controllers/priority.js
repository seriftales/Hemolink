const { getPriorityBloodRequest } = require('../utils/priority');

const getPriorityRequest = async (req, res) => {
  try {
    const priorityRequest = await getPriorityBloodRequest();
    
    if (!priorityRequest) {
      return res.status(404).json({
        success: false,
        message: 'Öncelikli başvuru bulunamadı'
      });
    }

    res.status(200).json({
      success: true,
      data: priorityRequest
    });

  } catch (error) {
    console.error('Öncelikli başvuru getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = { getPriorityRequest }; 