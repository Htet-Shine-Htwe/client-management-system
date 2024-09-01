import 'dart:convert'; // Needed for JSON decoding
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  String _errorMessage = '';
  bool _isAuthenticated = false;
  String _token = '';
  Map<String, dynamic> _user = {};

  String get errorMessage => _errorMessage;
  bool get isAuthenticated => _isAuthenticated;
  String get token => _token;
  Map<String, dynamic> get user => _user;

  Future<bool> login(String code, String password) async {
    try {
      final response = await http.post(
        Uri.parse('http://localhost:8000/api/v1/login'),
        body: {
          'code': code,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);

        if (responseData['message'] == 'Login successful') {
          _isAuthenticated = true;
          _token = responseData['token'];
          _user = responseData['user'];

          notifyListeners();
          return true;
        } else {
          _errorMessage = 'Invalid credentials';
          notifyListeners();
          return false;
        }
      } else {
        _errorMessage = 'Server error: ${response.statusCode}';
        notifyListeners();
        return false;
      }
    } catch (e) {
      _errorMessage = 'Invalid credentials';
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _isAuthenticated = false;
    _token = '';
    _user = {};
    notifyListeners();
  }
}
